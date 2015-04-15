# -*- coding:gbk -*-
#客户端程序

import socket as S
import threading,time,random,string,sys

count = 1                                                #记录客户端发送请求的次数
maxRtt = 0                                               #记录最大的请求往返时间
minRtt = 0                                               #记录最小的请求往返时间
avgRtt = 0                                               #记录所有请求的平均往返时间
sumRtt = 0                                               #记录请求的往返时间和
tag = 1                                                  #作为输出所有请求结果的标志
first_minRtt = 1                                         #作为记录第一个最小RTT的标志
send = 0                                                 #记录成功发送请求的数量
#定义函数创建客户端的socket套接字
def clientSocket(name,lock,host,port):
    BUFSIZE = 1024                                       #记录接收信息的最大字节量
    addr_1 = (host,port)                                 #服务端地址
    rtt = 0                                              #折返时间
    #声明全局变量
    global count
    global maxRtt   
    global minRtt  
    global sumRtt
    global avgRtt    
    global tag
    global first_minRtt
    global send

    #创建客户端的socket套接字，并设置端口可重用
    udpClient = S.socket(S.AF_INET,S.SOCK_DGRAM)
    udpClient.setsockopt(S.SOL_SOCKET,S.SO_REUSEADDR,1)

    while count<=10:                                     #最大请求量为10
        try:
            lock.acquire()                               #客户端进程获得一个锁，以下内容不能为其他进程共享，知道该进程释放锁
            data_1 = 'Request from %s :PingUDP SequenceNumber: %s TimeStamp: %s ' % (name,str(count),string.atof(time.time()))            #发送给服务端的信息
            time_1 = string.atof(time.time())            #记录向服务器发送请求的时间，并将其转换为浮点型的秒

            #模拟分组传输延迟的标志，
            sign = random.random()           
            if sign > 0.5:                               #二分之一的概率会产生延迟延迟
                time.sleep(0.5)                          #延迟0.5秒发送请求
            udpClient.sendto(data_1,addr_1)              #向服务端发送请求信息
            
            #接收来自服务器端的数据
            data_2,addr_2 = udpClient.recvfrom(BUFSIZE)
            time_2 = string.atof(time.time())            #记录接收到服务器反馈信息的时间，并将其转换为浮点型的秒
            rtt = time_2-time_1                          #计算折返时间
        
            if rtt <= 1:                                 #如果折返时间不超过1秒，则输出服务端反馈的信息data_2
                sumRtt+=rtt
                send+=1                                  #成功发送的请求次数加1
                if rtt > maxRtt:                         #此次请求时间大于所记录的最大折返时间
                    maxRtt = rtt
                elif first_minRtt:                       #当前的请求是成功的首次请求
                    first_minRtt = 0
                    minRtt = rtt
                elif (first_minRtt==0) and (rtt < minRtt): #此次请求时间小于最小折返时间
                    minRtt = rtt
                print '\n'+data_2+' RTT: ',int(1000*rtt)   #输出从服务端发送回来的信息
            else:                                          #发送的请求失败
                print '\nRequest failed!'
            count+=1                                       #发送下一条请求
            lock.release()                                 #客户端进程释放锁
        except:                                            #处理异常
            print
    udpClient.close()                                      #关闭套接字
    avgRtt = (1000*sumRtt)/10                              #求平均往返时间，单位毫秒
    if tag:                                                #所有的请求已经结束，输出统计结果
        tag = 0
        print '\n'
        print 'send: %s  relpay: %s  lost: %s' % (str(count-1),str(send),str(count-send-1)),'\n'
        print '平均RTT: %s  最大RTT: %s  最小RTT: %s ' % (str(int(avgRtt)),str(int(1000*maxRtt)),str(int(1000*minRtt)))

#构建clientThread类继承threading.Thread类
class clientThread(threading.Thread):   
    #初始化clientTreading类
    def __init__(self,lock,threadName,host,port):
        '''
        @初始化对象
        @para host:服务端IP值
        @para port:服务端端口号
        @para lock:锁对象
        @para threadName:线程名称
        '''

        #显示调用父类的初始化函数
        super(clientThread,self).__init__(name=threadName)
        self.lock = lock
        self.host = host
        self.port = port

    #重写父类的run方法
    def run(self):
        '''
        @重写父类的run方法，在线程启动之后调用该方法
        '''
        clientSocket(self.name,self.lock,self.host,self.port) #调用clientSocket函数
        

#定义创建线程的方法
def createThread(host,port):
    lock = threading.Lock()
    #for i in range(2):
       # clientThread(lock,'thread_'+str(i)).start()
    clientThread(lock,'A',host,port).start()  #创建并启动线程
    clientThread(lock,'B',host,port).start()  #创建并启动线程

if __name__ == '__main__':
    createThread(sys.argv[1],int(sys.argv[2]))
