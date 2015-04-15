# -*- coding: gbk -*-
#服务端程序

import socket as S
import thread,random,time,sys

count = 1                                                    #记录接收的请求数量
def server(port):
    host = ''                                                #表明该服务器可以接受来自任意地址的请求
    BUFSIZE = 1024                                           #设置接受信息的最大字节量
    global count
    addr_1 = (host,port)                                     #服务端所绑定的地址
    head_msg = ''                                            #记录头部信息
    ori_port=0                                               #源端口(客户端端口)
    obj_port=port                                            #目的端口(服务端端口)

    #创建一个服务器端的套接字
    udpServer = S.socket(S.AF_INET,S.SOCK_DGRAM)
    udpServer.setsockopt(S.SOL_SOCKET,S.SO_REUSEADDR,1)      #s设置允许端口重用

    #绑定服务器套接字
    udpServer.bind(addr_1)

    data_1='Requested succeedly!'                            #反馈回客户端的数据
    while True:
        sleep_time = random.uniform(0,1)                     #随机生成小于一秒的睡眠时间
        data_2,addr_2 = udpServer.recvfrom(BUFSIZE)          #接收来自客户端的数据
        ori_port = addr_2[1]                                 #将源端口置为客户端端口值
        head_msg = '源端口：%s 目的端口: %s ' % (str(ori_port),str(obj_port))   #UDP数据的头部信息
        if data_2:                                           #如果从客户端返回的信息不为空
            print head_msg+data_2+'\n'                       #输出来自客户端的请求信息
            time.sleep(sleep_time)                           #设定睡眠时间，模拟传输延迟
            udpServer.sendto('Reply from %s : %s' % ('localhost',data_1),addr_2)    #反馈信息给客户端
        else:
            udpServer.sendto('Requested falied!')
        count+=1                                             #接收下一条客户端的请求
        if count>10:                                         #当count达到10时退出该线程（客户端对服务端的ping）
            thread.exit_thread()
    udpServer.close()                                        #关闭套接字

if __name__=='__main__':
    server(int(sys.argv[1]))
