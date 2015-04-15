#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include<malloc.h>

#define AtomType char
#define MAXSIZE  1024                               
#define OK       1
#define ERROR    0
#define TRUE 1
#define FALSE 0
#define OVERFLOW -2

typedef int Status;
typedef enum {ATOM,LIST} ElemTag;
typedef struct GLNode                   
{                                      
	ElemTag tag;
	union
	{
		AtomType  atom;
		struct GLNode *hp;
	}ptr;
    struct GLNode *tp;
}GLNode,*GList;
                                     
/********************定义复制字符串的函数**************************************/
//功能：将str2字符串复制给str1
//返回：复制成功返回OK

Status StrCopy(char *str1,char *str2){
	int i;
	for(i=0;*(str2+i);i++)
		*(str1+i)=*(str2+i);
	*(str1+i)='\0';
	return OK;
}
                             
/*******************定义清除字符串函数*****************************************/
//功能：清空str字符串
//返回：成功返回OK

Status ClearString(char *str){  //在sever函数中调用
	if(str){     //置为空数组
		*(str)='\0';
	}
	return OK;
}

/*******************定义计算字符串长度的函数***********************************/
//功能：计算字符串str的长度
//返回：成功返回str的长度len
int Strlen(char *str){
	int i,len=0;                              
	for(i=0;*(str+i);i++){
		len++;
	}	                  
	return len;
}

/*******************定义取子串函数*********************************************/
//功能：从str字符串中取出第pos位置起长度为Len的字符串，并用sub返回该字符串
//返回：成功返回OK

Status SubString(char *sub,char *str,int pos,int len){//用sub返回字符串str中第pos位置起长度为len的字符串   
	int i;
	if(pos<1||pos>Strlen(str)||len<0||len>Strlen(str)-pos+1) return ERROR;            
	else{
		if(!len){//返回空子串
			*sub='\0';
		}                                    
		else{//返回完整子串                  
			for(i=0;i<len;i++){
				*(sub+i)=*(str+(pos-1+i));
			}                                         
			*(sub+i)='\0';
		}                                                   
		return OK;
	}
}                                            

/*******************定义以','为分割点将非空串str分割成两部分的函数*************/
//功能：从str字符串中取出第一个','位置之前的字符串，并用sub返回该字符串
//返回：成功返回OK
           
Status sever(char* str,char *hstr){
	int i=0,k=0,n;
	char ch[5];
	n=Strlen(str);
	do{                                                    
		++i;
		SubString(ch,str,i,1);
		if(ch[0]=='(') ++k;   //k记录尚未配对的左括号的个数
		else if(ch[0]==')') --k;
	}while(i<n&&(ch[0]!=','||k!=0));                             
	if(i<n){        //i表示第一个','的位置
		SubString(hstr,str,1,i-1);    //分离出','之前的字符串,要不要包括','？？？
		SubString(str,str,i+1,n-i);   //将','之后的字符串赋给str
	}
	else{                          
		StrCopy(hstr,str);  //将最后一个子串赋给hstr
		ClearString(str);  //释放该字符串所占用的空间
	}
	return OK;
}

/*******************定义visit访问函数*****************************************/
//功能：将字符c输出
//返回：成功返回0
int visit(char c){
	printf("%c ",c);
	return 0;              
}

/******************定义构建空广义表的函数**************************************/
//功能：构建空广义表
//返回：返回构建的空广义表
GLNode * InitGList(){//创建空的广义表L
	GLNode *L;
	if(!(L=(GLNode *)malloc(sizeof(GLNode)))) exit(OVERFLOW);
		 L->tag=LIST;
		 L->ptr.hp=NULL;
		 L->tp=NULL;
	return L;                    
}

Status GListEmpty(GList L){//判断广义表L是否为空
	if(!L->ptr.hp && !L->tp) return TRUE;
	else return FALSE;
}

/******************定义构建广义表的函数****************************************/ 
//功能：根据字符串s，建立广义表
//返回：成功则返回建立的广义表的表头head，否则，返回NULL
GLNode * CreateGList(char *s)   
{
	GLNode *p,*q,*r,*head;
    char sub[MAXSIZE],hstr[MAXSIZE];
    int len;                           
	len = Strlen(s);
    if ( !strcmp(s,"()") || !len)  head = NULL;     //  空表情况
	else if (len == 1)                              // 原子情况
	{
		head=InitGList();   //构建空栈     
		head->tag =ATOM;                              // 构造原子结点
		head->ptr.atom = *s;
	}                                
    else                                            //  子表情况
	{
		head=InitGList();
		p = head;
		SubString(sub,s,2,Strlen(s)-2);  //脱去外层括号,用sub返回字符串
		do 
		{
			sever(sub,hstr);  //调用之后hsub返回sub中第一个','前的部分作表头，sub返回其后面部分作表尾
			r = CreateGList(hstr);
			p->ptr.hp = r;                           // 尾插法建表
			q=p;
			len = Strlen(sub);
			if (len > 0)
			{
				p = (GLNode*)malloc(sizeof(GLNode));
				if (!p) return NULL;
				p->tag =LIST;
				q->tp=p;                   
			}
		} while (len > 0);
		q->tp=NULL;
	}
    return head;
}

/******************定义销毁广义表的函数****************************************/
//功能: 销毁已经存在的广义表L           
void DestroyGList(GList L)
{                                          
  if(L!=NULL) 
  L->ptr.hp=NULL; 
}

/******************定义获取广义表表头元素的函数*********************************/ 
//功能：取出广义表L的表头部分
//返回：成功则返回广义表L的表头，否则，返回NULL
GList GetHead(GList L)
{                                          
	GList P;
	P=InitGList();
	if (!L)  return (NULL);                    // 空表无表头
	if (L->tag == ATOM){                       // 原子结点不是表
		P->tag=ATOM;
		P->ptr.atom=L->ptr.atom;
		return P;		
	}             
	else return (L->ptr.hp);
}

/*****************定义获取广义表表尾元素的函数*********************************/
//功能：取出广义表L的表尾部分
//返回：成功返回广义表L的表尾部分，否则，返回NULL
GList GetTail(GList L)
{
	GList P;
	P=InitGList();
	if (!L) return (NULL);                        
	if (L->tag == ATOM){
		P->tag=ATOM;
		P->ptr.atom=L->ptr.atom;
		return P;
		
	}
	else return (L->tp);
}

/*****************定义求广义表长度的函数*************************************/
//功能:求出广义表L的长度
//返回:广义表的长度GLlen
int GListLength(GList L)
{
	int GLlen=0;
	GLNode *s;                                   
	if (!L) return 0;                    // 空表的长度为零
	if (L->tag ==ATOM) exit(0);            // 原子不是表
	s=L;
	while(s)                             // 统计表的最上层的长度
	{
		GLlen++;
		s=s->tp;
	}
	return GLlen;
}                                         

/****************定义求广义表L的深度的函数************************************/
//功能：求得广义表L的深度
//返回：广义表L的深度dep
int GListDepth(GList L)
{
	int dep,max;
	GLNode *s;

	if (!L)  return (1);             // 空表的深度为 1
	if (L->tag==0)  return 0;        // 原子的深度为 0          
	s=L;
	for(max=0;s;s=s->tp){
		dep=GListDepth(s->ptr.hp);   //求表头深度
		if(dep>max) max=dep;
	}
	return (max+1);                  // 表的深度为子表深度加一
}

/*************定义将广义表res复制到广义表dest的函数******************************/
//功能：完成广义表的复制,将res复制到dest中
//返回：成功返回OK，否则，返回ERROR
Status  CopyGList(GList *dest,GList res)
{
	*dest=InitGList();
	if (!res) {*dest = NULL;return 1;}         
	(*dest)->tag = res->tag;
	if (res->tag==ATOM)  (*dest)->ptr.atom = res->ptr.atom;
    else
    {
		CopyGList(&(*dest)->ptr.hp,res->ptr.hp);
		CopyGList(&(*dest)->tp,res->tp);
	}
	return OK;               
}

/**************定义插入元素e作为广义表L的第一元素的函数***************************/
//功能：将广义表e插入到广义表L中作为表头元素
//返回：成功返回OK，否则，返回ERROR
Status InsertFirst_GL(GList *L,GList e){      
	GList temp;
	CopyGList(&temp,*L);
	(*L)->ptr.hp=e;
	(*L)->tp=temp;
	return OK;
}

/******************定义删除广义表中第一元素的函数****************************/
//功能：将广义表L中的表头元素删除
//返回：返回L的表头P，同时L改变
GList DeletFirst_GL(GList *L){//删除广义表的第一元素，并用e返回
	GList P;
	P=InitGList();
	if(*L){
		P=(*L)->ptr.hp;
		*L=(*L)->tp;   //L指向表尾
		//(*L)->ptr.hp=(*L)->tp;  //L的表尾赋值给L的表头，达到只删除第一元素的目的
		//(*L)->tp=NULL;
		P->tp=NULL;   //P的表尾由不空置为空
	}
	return P;                                     
} 

/******************定义遍历访问广义表元素的函数*************************************/
//功能：遍历广义表L中的元素值，并调用函数visit(char)来访问
void Traverse(GList L,int (*f)(char c))
{
	f=visit;
	if (L)
	{
		if (L->tag==ATOM){                   
			f(L->ptr.atom);
		} 
		else  Traverse(L->ptr.hp,f);            // 往下遍历，类似二叉树中的左子树
		if (L->tp) Traverse(L->tp,f);           // 往右遍历，类似二叉树中的右子树
	}
}                       

/******************定义输出广义表元素的函数****************************************/
//功能：对广义表head元素按照原始的字符串形式输出
//返回：成功遍历之后返回OK

Status DisplayGList(GList head)
{
	GLNode *p,*q;    
	if (!head)  return OK;
	if (head->tag==0)
	{
		printf("%c",head->ptr.atom);
	}
	printf("(");
	if (head)
	{
		do 
		{
			p = head->ptr.hp;
			q = head->tp;
			//遍历同一层次的原子,不存在子表的情况下，即深度为1
			while (q && p && p->tag == 0)                //  同一层的原子结点
			{
				printf("%c,",p->ptr.atom);
				p = q->ptr.hp;
				q = q->tp;
			}
			if (p && !p->tag)                           //遍历同一层原子之后剩下的最后一个原子结点
			{
				printf("%c",p->ptr.atom);
				break;
			}
			else                                        // 子表情况
			{
				if (!p) printf("()");
				else DisplayGList(p);                  //遇到子表就递归调用
				if (q)  printf(",");
				head = q;
			}
		} while (head);
		printf(")");
	}
	return OK;
}

/******************主函数***********************************************************/ 
void main()                     
{
	char s[MAXSIZE],temp[MAXSIZE],choice='Y',input='Z';  //'Z'字符无任何意义
	GList head,GetH,GetT;
    GList L,Q,E,P;
    printf("\n\n\n");         
    printf("	---------------------  ADT 广义表实现  -------------------------\n\n");
    printf("	*                                                              *\n\n");
    printf("	*              制作:  丘东伟         学号:3112006207           *\n\n");
    printf("	*              课程：数据结构        指导老师：李藜            *\n\n");
    printf("	*                                                              *\n\n");
    printf("	----------------------------------------------------------------\n");
	printf("\n\n\n");
	printf("	请输入你要创建的广义表:");
	gets(s);
	head = CreateGList(s);  //创建广义表       
	if(head){
		 printf("	----------------------------------------------------------------\n");
		 printf("				广义表创建成功！\n");
		 printf("	----------------------------------------------------------------\n");
		 printf("	创建的广义表为：");
		 DisplayGList(head);    //输出创建的广义表head
		 printf("\n");
	}
	else{
		 printf("	----------------------------------------------------------------\n");
		 printf("				广义表创建失败！\n");
		 printf("	----------------------------------------------------------------\n");
	}                   
    while (choice=='Y'){
		printf("	****************************************************************\n");     
        printf("	*                         ADT广义表实现                        *\n");
        printf("	****************************************************************\n");
        printf("	*      A.新建广义表      B.取表头         C.取表尾             *\n");
        printf("	*      D.求长度          E.求深度         F.检查空表           *\n");
        printf("	*      G.复制广义表      H.插入表头元素   I.遍历广义表         *\n");
        printf("	*      J.删除表头元素    K.销毁表         Q.退出               *\n");
        printf("	*                                                              *\n");
        printf("	****************************************************************\n\n");
        printf("	请输入您要选择的功能:");
		if(input!='Z') choice=getchar();   //用于接受换行符,否则当输入值之后的换行符对下一次取值产生影响
		scanf("%c",&input);                       
        switch (input)
        {
        case 'A':
        case 'a':             
            printf("\n	请输入您要新建的广义表:");
        	scanf("%s",s);
        	head = CreateGList(s);
			printf("	创建的广义表为：");
			DisplayGList(head);
	        printf("\n");
            break;
        case 'B':
        case 'b':
            GetH=GetHead(head);   //获取表头
            if(GetH&&GetH->tag!=ATOM){
				printf("\n	广义表表头是：");
				DisplayGList(GetH);   //输出表头
			}
			else if(!head && !GetH){
				printf("\n	空表无表头！");
			}
			else if(GetH->tag==ATOM){
				printf("\n	广义表表头是：%c",GetH->ptr.atom);
			}
			else{
				printf("\n	广义表表头是：()");
			}
			printf("\n");          
            break;
        case 'C':
        case 'c':
			GetT=GetTail(head);   //获取表尾
            if(GetT){
				printf("\n	广义表表尾是: ");
				DisplayGList(GetT);   //输出表尾
			}
			else if(!head && !GetH){
				printf("\n	空表无表头！");
			}
			else if(GetH->tag==ATOM){
				printf("\n	广义表表头是：%c",GetH->ptr.atom);
			}
			else{
				printf("\n	广义表表头是：()");
			}
			printf("\n");        
            break;
        case 'D':
        case 'd':
       	    printf("\n	广义表长度是： %d\n",GListLength(head));
            break;
        case 'E':
        case 'e':
            printf("\n	广义表深度是: %d\n",GListDepth(head));
            break;
		case 'F':
        case 'f':
            if(GListEmpty(head))
				printf("\n	这是一个空的广义表！\n");
            else printf("\n	 这是一个非空广义表！\n");
            break;
		case 'G': 
        case 'g':           
            CopyGList(&L,head);
			printf("\n	复制广义表:");
        	DisplayGList(L);   //输出复制的广义表
	        printf("\n");           
            break;
		case 'H':  
        case 'h':
			choice=getchar();
            printf("\n	输入想要插入的元素：");     
			gets(temp);
			E=CreateGList(temp);       //通过字符串temp创建广义表E
			InsertFirst_GL(&head,E);   // 将广义表E作为表头插入head广义表中
			printf("\n	插入元素之后的广义表如下：\n");
			printf("		");            //输出两个列表间距
			DisplayGList(head);        //输出新表        
            break;
		case 'I':
        case 'i':           
            printf("\n	遍历访问广义表:\n");
			printf("	");//输出一个字符间距
	        Traverse(head,visit);
        	printf("\n");          
            break;
		case 'J': 
        case 'j':        
            P=DeletFirst_GL(&head);    //删除表头元素
			printf("\n	删除表头元素之后的广义表如下：\n");
			printf("	");            //输出一个字符间距
			DisplayGList(head);        //输出新表
			printf("\n");
			break;
		case 'K':
        case 'k':
            DestroyGList(L);
            if(L->ptr.hp==NULL) 
            printf("\n	销毁成功!\n");
            else 
            printf("\n	销毁失败！\n");     
            break; 
        case 'Q':
        case 'q':                              
			exit(1) ;
		default:
			printf("\n	----------------------------------------------------------------\n");
			printf("			您的输入有误！\n");
			printf("	----------------------------------------------------------------\n");

        }//switch
		if(input!='h'&& input!='H') choice=getchar();      //用来接受换行符
		printf("\n	如果想要继续执行其他指令，请按‘Y’，否则按'N'：");
		choice=getchar();      //用来接受指令
    }//while		
}//main

