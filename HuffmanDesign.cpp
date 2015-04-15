/*****哈弗曼树和哈弗曼编码的存储表示*****/

typedef struct{
	char data;
	unsigned int weight;//存放权值，该题中存放的是字母频度
	unsigned int parent,lchild,rchild;
}HTNode,*HuffmanTree; //动态分配数组存储哈弗曼树

typedef char * *HuffmanCode; //动态分配数组存储哈弗曼编码表

/*****栈的存储表示*****/
#define STACK_INIT_SIZE 100
#define STACKINCREMENT 10
#define OK 1
#define ERROR 0
#define OVERFLOW -2

//定义函数返回类型
typedef int Status;

//定义栈的元素类型
typedef struct{
	int blank;
	HTNode huTree;
}SElemType; 

//定义栈类型
typedef struct{
    SElemType *base;
    SElemType *top;
    int stacksize;
}Stack;

#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<malloc.h>
#include<conio.h> 

#define PAUSE system("pause>nul") //定向显示内容
#define CLS system("cls")  //宏定义清屏

//定义构造空栈函数
Status InitStack(Stack &s){
    s.base=(SElemType*)malloc(STACK_INIT_SIZE * sizeof(SElemType));
    if(!(s.base)) exit(OVERFLOW);  //存储分配失败
    s.top=s.base;
    s.stacksize=STACK_INIT_SIZE;
    return OK;
}

//定义取栈元素函数
Status GetTop(Stack s,SElemType &e){
    if(s.top==s.base) 
		return ERROR;
    e=*(s.top-1);
    return OK;
}

//定义插入栈元素函数
Status Push(Stack &s,SElemType e){
    if(s.top-s.base>=s.stacksize){//栈满，追加存储空间
        s.base=(SElemType *)realloc(s.base,(s.stacksize+STACKINCREMENT)*sizeof(SElemType));
        if(!s.base) exit(OVERFLOW);//存储分配失败
    
        s.top=s.base+s.stacksize;
        s.stacksize=+STACKINCREMENT;
    }
    *s.top++=e;
    return OK;
    
}

//定义删除栈顶元素函数
Status Pop(Stack &s,SElemType &e){
    if(s.top==s.base) 
		return ERROR;
    e=*--s.top;
    return OK;
}

//定义判断空栈函数
Status StackEmpty(Stack s){
    if(s.top==s.base) 
		return OK;
    else return ERROR;
}

/*****定义字符输入函数，并以此创建哈弗曼树*****/
void InputChars(){
	FILE *fp;
	int weight[100]; //分别存储字符与权值
	int i,j,number,value;
	char ch,str[100],w[5]={'\0'};
	printf("Input the number of chars you want to creat HuffmanTree:");
	scanf("%d",&number);
	for(i=0;i<number;i++){
		printf("\n");
		printf("Input the char:");
		ch=getchar(); //接受换行符
		str[i]=getchar();
		printf("\nInput its weight:");
		scanf("%d",&weight[i]);
	}
	
	if((fp=fopen("huffmanChars.txt","w"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	for(i=0;i<number;i++){ //写入字符
		fputc(str[i],fp);
		fputc(' ',fp);
		//权值为个位数
		if(weight[i]<10){
			fputc(weight[i]+48,fp); //将数字转化为对应字符
		}
		//权值大于个位数
		else{
			value=weight[i];
			//将权值倒置存储到w数组中
			j=0;
			while(value){
				w[j]=value%10+48;
				value/=10;
				j++;
			}
			for(j--;j>=0;j--)
				fputc(w[j],fp); //对w数组（字符类型的元素）从后输出到文件中
		}
		fputc(' ',fp);
		fputc(' ',fp);
	}
	fclose(fp);

	printf(" $ ---------输入的字符已经成功存储在huffmanchars.txt文件！--------- $\n\n");
}

/*****定义在所以结点中寻找权值最小且没有双亲的两个结点*****/
void Select(HuffmanTree HT,int n,int *s1,int *s2){
	int i,j,temp;
	*s1=0;
	//为s1，s2赋初值
	for(i=1;i<=n;i++){
		if(HT[i].parent==0){
			if(*s1==0){// s1未曾赋值
				*s1=i;
			}
			else{//否则给s2赋值
				*s2=i;
				break;
			}
		}
	}//for
	if(HT[*s1].weight>HT[*s2].weight){//权值小的赋值给s1
		temp=*s1;
		*s1=*s2;
		*s2=temp;
	}

	for(j=i;j<=n;j++){//从s2指向的位置开始寻找
		if(HT[j].parent==0){//该结点尚未有双亲，则属于寻找范围
			if(HT[j].weight<HT[*s1].weight){//找到比s1指向的权值更小的值
				*s2=*s1;
				*s1=j;
			}
			else if(*s1!=j && HT[j].weight<HT[*s2].weight){//前一个条件防止当s1在s2后面时判断失误
				*s2=j;
			}
		}
	}//for
}

/**********定义创建哈弗曼树的函数*********/
void CreateHuffman(HuffmanTree &HT){
	HuffmanTree p;
	int num,m,i=0,j=0,k=0,value,wNum[100]={0};
	int s1,s2;
	char str[100]={'\0'},wStr[100]={'\0'},fstr[200]={'\0'},par[5]={'\0'};
	FILE *fp;
	if((fp=fopen("huffmanChars.txt","r"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	fgets(fstr,199,fp);
	fclose(fp);
	while(fstr[i]){
		if(fstr[i]!=' ') {
			if(fstr[i]>=48 && fstr[i]<=57){//将数字字符存储到w数组中
				wStr[j]=fstr[i]; //存储的是字符元素
				j++;
			}
			else{//字母字符存储到str数字中
				wStr[j]=' '; //用于区别各字母的权值
				j++;
				str[k]=fstr[i];
				k++;
			}
			
		} 
		i++;
	}
	wStr[j]='\0';
	str[k]='\0';
	num=k; //统计文件中的非空格的字符个数
	for(i=0,j=1;wStr[j];j++){
		if(wStr[j]!=' '){//连续的数字字符组合成数字权值
			wNum[i]*=10;
			wNum[i]+=(wStr[j]-48);  //存放的是int类型的元素
		}
		else 
			i++;
	}

	if(num<=1) return;
	m=2*num-1;
	HT=(HuffmanTree)malloc((m+1)*sizeof(HTNode)); //0号单元未用
	for(p=HT+1,i=1;i<=num;++i,++p){  //初始化哈弗曼树的结点
		p->data=str[i-1];
		p->weight=wNum[i-1];
		p->parent=0;
		p->lchild=0;
		p->rchild=0;
	}
	for(;i<=m;++i,++p){
		p->data='\0';
		p->weight=0;
		p->parent=0;
		p->lchild=0;
		p->rchild=0;
	}

	for(i=num+1;i<=m;++i){//创建哈弗曼树
		//在HT[1..i-1]选择parent为0且weight最小的两个结点，其序号分别为s1和s2.
		Select(HT,i-1,&s1,&s2);
		HT[s1].parent=i;
		HT[s2].parent=i;
		HT[i].lchild=s1;
		HT[i].rchild=s2;
		HT[i].weight=HT[s1].weight+HT[s2].weight;
		HT[i].data='#';  //双亲结点用'#'表示
	}

	//将创建的哈弗曼树存入hfmTree.txt中
	if((fp=fopen("hfmTree.txt","w"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	for(i=1;i<=num;i++){
		fputc(HT[i].data,fp);
		fputc(' ',fp);
		fputs("parent:",fp);
		if(HT[i].parent<10){
			fputc((HT[i].parent)+48,fp);
		}
		else{
			value=HT[i].parent;
			//将权值倒置存储到par数组中
			j=0;
			while(value){
				par[j]=value%10+48;  //存放的是字符元素
				value/=10;
				j++;
			}
			for(j--;j>=0;j--)
				fputc(par[j],fp);   //将par数组中的字符输入到文件
		}
		fputc(' ',fp);
		fputc(' ',fp);
	}
	fclose(fp);
	printf(" $ ----------- 创建的哈夫曼树已经成功存储在hufTree.txt！----------- $\n\n");
}

/**********定义编码函数***********/
//算法：在文件hufmanTree.txt中读取哈夫曼树，从叶子到根逆向求每个字符的哈弗曼编码
void Encoding(HuffmanTree &HT,HuffmanCode &HC){
	FILE *fp;
	int count=0,i=0,start,c,f;
	char fstr[200];
	if((fp=fopen("huffmanChars.txt","r"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	fgets(fstr,199,fp);
	fclose(fp);
	while(fstr[i]){
		if(fstr[i]!=' ') {
			if((fstr[i]>='a'&&fstr[i]<='z') || (fstr[i]>='A'&&fstr[i]<='Z')){
				count++;  //计算字母字符个数
			}
			
		} 
		i++;
	}
	HC=(HuffmanCode)malloc((count+1)*sizeof(char *));//分配n个字符编码的头指针向量
	char *cd;
	cd=(char *)malloc(count*sizeof(char));//分配求编码的工作区间
	cd[count-1]='\0';//编码结束符
	for(i=1;i<=count;i++){//逐个字符求哈弗曼编码
		start=count-1; //编码结束符位置
		for(c=i,f=HT[i].parent;f!=0;c=f,f=HT[f].parent){//从叶子到根逆向求编码
			if((int)HT[f].lchild==c) cd[--start]='0';
			else cd[--start]='1';
		}
		HC[i]=(char *)malloc((count-start)*sizeof(char));//为第i个字符编码分配空间
		strcpy(HC[i],&cd[start]); //从cd数组中start地址开始的字符串赋值给HC

	}//for逐个字符求哈弗曼编码
	free(cd);
	if((fp=fopen("CodeFile.txt","w"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	for(i=1;i<=count;i++){//写入文件
		fputs(HC[i],fp);
	}
	fclose(fp);
	printf(" $ ----------哈夫曼树已经成功编码并存储在CodeFile.txt文件！------- $\n\n");
}

/*定义查找叶子结点的函数*/
int find(HuffmanTree &HT,char c,int *n){
	int temp=0;
	if(c=='0'){//左分支
		temp=HT[*n].lchild;
	}
	else if(c=='1'){//右分支
		temp=HT[*n].rchild;
	}
	return temp;
}

/*定义译码函数*/
void Decoding(HuffmanTree &HT){
	char *str,*p,Cstr[200]={'\0'},fstr[100]={'\0'};
	FILE *fp,*fq;
	int i=0,k=0,num=49,m,n; //k用来表示根结点位置
	//读取编码，存储到Cstr数组中
	if((fp=fopen("CodeFile.txt","r"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	fgets(Cstr,199,fp);
	fclose(fp);
	str=(char *)malloc((num+1)*sizeof(char));//分配存储译码字符的空间
	for(k=1;HT[k].parent!=0;){
		k=HT[k].parent; //k记录根结点位置
	}

	for(n=k,p=str,i=0;Cstr[i];i++){
		m=find(HT,Cstr[i],&n);
		if(HT[m].data!='#'){//检查该结点是否为叶子结点
			*p=HT[m].data;
			p++;
			n=k;
		}
		else n=m;
	}//for
	*p='\0';
	if((fq=fopen("TextFile.txt","w"))==NULL){//  打开磁盘文件
		printf("Can't not open file!\n");
		exit(0);
	}
	fputs(str,fq);
	fclose(fq);
	printf(" $ ---------哈夫曼树已经成功译码并存储在TextFile.txt文件！--------- $\n\n");
}

/***定义打印哈弗曼编码的函数***/
void Print(){
	FILE *fp;
	char Cstr[200]={'\0'};
	int i;
	if((fp=fopen("CodeFile.txt","r"))==NULL){//打开磁盘文件失败
		printf("Can't not open file!\n");
		exit(0);
	}
	fgets(Cstr,199,fp);
	fclose(fp);
	printf(" $ ------以每行不超过50个字符的方式紧凑输出哈弗曼编码到屏幕上：---- $\n");
	for(i=0;Cstr[i];i++){
		if(i%50==0) printf("\n");
		printf("%c",Cstr[i]);
	}
	printf("\n");
	printf("\n");
}

/**定义以凹凸形式打印哈弗曼树的函数**/
void TreePrint(HuffmanTree &HT){
	FILE *fp;
	int i,k,count;
	SElemType e1,e2,e3;
	Stack s;
	InitStack(s);
	for(k=1;HT[k].parent!=0;){
		k=HT[k].parent; //k记录根结点位置
	}
	//<-------将哈夫曼树存储到TreePrint.txt文件
	if((fp=fopen("TreePrint.txt","w"))==NULL){//打开磁盘文件失败
		printf("Can't not open file!\n");
		exit(0);
	}
	//---------->
	for(i=0;i<10;i++){
		printf(" ");
		fputc(' ',fp);
	}
		
	i=k;
	count=0;
	while(i!=0){//存在结点//while(HT[i].data!='\0'){//存在结点
		printf("%c  ",HT[i].data);

		//<-------存入TreePrint.txt文件
		fputc(HT[i].data,fp);
		fputc(' ',fp);
		fputc(' ',fp);
		//------------->

		if(HT[i].rchild){ //存在右孩子的结点入栈
			e1.huTree=HT[i];
			e1.blank=10+3*count;
			Push(s,e1);
		}
		i=HT[i].lchild;//令i指向左孩子的位置
		count++;
	}//存在结点
	printf("\n");

	//<-------存入TreePrint.txt文件
	fputs("\n",fp);
	//------------->

	GetTop(s,e1); //获取栈顶元素
	while(!StackEmpty(s)){//栈不空
		Pop(s,e1); //删除栈顶元素
		for(i=0;i<e1.blank+3;i++){
			printf(" ");

			//<-------存入TreePrint.txt文件
			fputc(' ',fp);
			//------------->

		}		
		printf("%c",HT[e1.huTree.rchild].data);

		//<-------存入TreePrint.txt文件
		fputc(HT[e1.huTree.rchild].data,fp);
		//------------->

		if(HT[e1.huTree.rchild].rchild){//右孩子不空，入栈
			e2.huTree=HT[e1.huTree.rchild];
			e2.blank=e1.blank+3;
			Push(s,e2);
		}
		i=HT[e1.huTree.rchild].lchild;
		while(i!=0){
			printf("  %c",HT[i].data);

			//<-------存入TreePrint.txt文件
			fputc(' ',fp);
			fputc(' ',fp);
			fputc(HT[i].data,fp);
			//------------->

			if(HT[i].rchild){//入栈
				GetTop(s,e2); //获取栈顶元素，用e2返回
				e3.huTree=HT[i];
				e3.blank=e2.blank+3;
				Push(s,e3);	
			}
			i=HT[i].lchild;
		}
		GetTop(s,e1); //获取栈顶元素
		printf("\n");

		//<-------存入TreePrint.txt文件
		fputs("\n",fp);
		//------------->

	}//栈不空
	fclose(fp);
	printf("\n");
	printf(" $ ------凹凸显示的哈夫曼树已经成功存储到TreePrint.txt文件！------- $\n\n");
}

/**********定义操作页面样式函数**********/
//调用系统，显示界面颜色范围，窗口大小 
void setWindow()
{
    system("mode con lines=40 cols=70");
    system("color AB");
}

void main(){
	int w;
	char choice,ch[5]={'\0'};
	HuffmanTree HT;
	HuffmanCode HC;
	setWindow();
    system("color 2F");
    system("color 2F");
	printf("\n");
	printf("\n");
	printf("\n");
	printf("\n");
	printf(" $ ---------------------------------------------------------------- $\n");
	printf("                     欢迎使用哈弗曼编/译妈器！\n");
	printf(" $ ---------------------------------------------------------------- $\n");
	printf("\n");
	printf("\n");
	printf(" $ ---------------------------------------------------------------- $\n");
	printf("\n");
	printf(" *               制作：丘东伟        学号：3112006207               * \n");
	printf("\n");
	printf(" *               课程：数据结构      知道老师：李藜                 * \n");
	printf("\n");
	printf(" $ ---------------------------------------------------------------- $\n");
	printf("\n");
	printf("\n");
	printf(" $ -------------------请按Enter键进入菜单页面：-------------------- $\n");
	PAUSE;
	while(1){
		CLS;
        system("color 2D");
        system("color 2F");
		printf("\n");
		printf("\n");
		printf(" $ ---------------------------------------------------------------- $\n");
		printf("                       欢迎使用哈弗曼编/译妈器！\n");
		printf(" $ ---------------------------------------------------------------- $\n");
		printf("\n");
		printf("\n");
		printf(" $ ---------------------------------------------------------------- $\n");
		printf("\n");
		printf(" *                A：创建哈弗曼树          B：编码哈夫曼树          *");
		printf("\n");
		printf("\n");
		printf(" *                C：译码哈夫曼树          D：输出哈夫曼树          *");
		printf("\n");
		printf("\n");
		printf(" *                Q：退出                                           *");
		printf("\n");
		printf(" $ ---------------------------------------------------------------- $\n");
		printf("\n");
		printf("\n");
		printf(" $ -------------------请选择您要执行的指令：----------------------- $\n");
		choice=getchar();
		switch(choice){
			case 'A':
			case 'a':{	ch[0]='A';
						InputChars();
						CreateHuffman(HT);
						printf(" $ ----------------------请按Enter以继续--------------------------- $\n");
						getch();
						break;
					}
			case 'B':
			case 'b':{	ch[1]='B';
						//检查是否已经创建了哈夫曼树
						if(!ch[0]){
							InputChars();
							CreateHuffman(HT);
							ch[0]='A';
						}
						Encoding(HT,HC);
						Print();
						printf(" $ ----------------------请按Enter以继续--------------------------- $\n");
						getch();
						break;
					}
			case 'C':
			case 'c':{	ch[2]='C';
						//检查是否已经创建了哈夫曼树
						if(!ch[0]){
							InputChars();
							CreateHuffman(HT);
							ch[0]='A';
						}
						//检查哈夫曼树是否已经编码
						if(!ch[1]){
							Encoding(HT,HC);
							ch[1]='B';
						}
						Decoding(HT);
						printf(" $ -----------------------请按Enter以继续-------------------------- $\n");
						getch();
						break;
					}
			case 'D':
			case 'd':{	//检查是否已经创建了哈夫曼树
						if(!ch[0]){
							InputChars();
							CreateHuffman(HT);
							ch[0]='A';
						}
						printf(" $ ------------------以凹凸的形式输出哈夫曼树---------------------- $\n");
						TreePrint(HT);
						printf(" $ ----------------------请按Enter以继续--------------------------- $\n");
						getch();
						break;
					}
			case 'Q':
			case 'q':{
						printf(" $ ----------------------感谢使用本系统！-------------------------- $\n");
						exit(1);
					}
		}//switch
		CLS;
	}//while
}

