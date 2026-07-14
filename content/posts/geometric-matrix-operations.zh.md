---
title: 从几何角度理解矩阵运算
date: 2021-07-03
tags: [数学, 矩阵, 线性代数]
summary: 从行列、左右乘法、坐标变换和方程组几何意义理解矩阵。
---

矩阵不同于函数，是数学中对数字/符号的另一种组合和运算方式，那问题来了：

* 有了函数，为何还要矩阵？
* 矩阵和函数有着怎样的区别与联系（几乎是数学中两大基本运算）？
* 抽象的矩阵运算又有什么意义（物理意义或者现实意义）？

目前我还回答不了上述问题，尤其是---**函数和矩阵这两种非常基本的描述 量之间关系及其变化规律的“数据结构”，在本质上有什么联系和区别？**

## 矩阵行列对称性？
矩阵的行与列在很多时候是对称的，比如行列式：$|A| = |A^T|$；秩：行秩等于列秩等。但同时矩阵在很多时候行列又是不对称的，比如矩阵乘法：$AB≠BA$；在方程组中只能用行变换等。
Why？每个具体的问题，看似都有答案。但是why？这不是几个无关的具体问题，而应该有着更“广泛”的原因。
有时我会想起左右手，左手和右手对称吗？有一定的对称性，但又不对称（一只手无法通过平移、旋转与另一只手重合），这在化学的分子结构中也有类似的问题。虽然矩阵行、列具有天然的对称性，但我们对矩阵乘法的定义就有着不对称性（否则AB就有可交换性了）。

那么：**为什么要按照矩阵相乘的顺序，有不同的定义？这背后又有怎样的现实意义？是不是意味着矩阵行列天生也是不对称的？**
我目前的答案是：总要区分左右手，矩阵的行与列也一样，总要规定行向量之间的运算，与列向量不同的运算，那这个规定就是矩阵乘法，对应左乘与右乘（还有对象问题，因为AB可以做看作B左乘A，也可以看作A左乘B，但是方程组中就“只能”看做A左乘B）就是行与列运算的不同。

因为矩阵乘法的规定，拿右乘是列变换举例：

1. 若将左边矩阵写成列向量的形式：

$$
[\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\ldots,\boldsymbol{\alpha}_n]K
= [\boldsymbol{\beta}_1,\boldsymbol{\beta}_2,\ldots,\boldsymbol{\beta}_m]
$$

$$
\boldsymbol{\beta}_j=\sum_{i=1}^{n}k_{ij}\boldsymbol{\alpha}_i
$$

其中 $K=(k_{ij})$ 的元素 $k_{ij}$ 是数，其余均为向量。

会发现，三个列向量α们的右乘一个矩阵得到另外三个列向量β们，而每个β都是三个α们的线性组合。

2. 若将左边矩阵写为行向量的形式：

$$
\begin{bmatrix}
\boldsymbol{\alpha}_1\\
\boldsymbol{\alpha}_2\\
\vdots\\
\boldsymbol{\alpha}_n
\end{bmatrix}K
=
\begin{bmatrix}
\boldsymbol{\beta}_1\\
\boldsymbol{\beta}_2\\
\vdots\\
\boldsymbol{\beta}_n
\end{bmatrix},
\qquad
(\boldsymbol{\beta}_i)_j
=\boldsymbol{\alpha}_i\cdot
\begin{bmatrix}k_{1j}\\k_{2j}\\\vdots\\k_{nj}\end{bmatrix}
$$

就会发现有所问题：β们并不能写成α们的线性组合，他们的关系变得复杂了起来。

结合上述两图不难发现，这两者的区别正是由于**矩阵乘法规定左边矩阵的第一行与右边矩阵第一列作内积得到矩阵左上角的数**。这天然就让左和右具有不对称性，左乘矩阵和右乘矩阵的区别也就不难理解了。

PS：若我们可以修改矩阵的运算规则，比如AB=C中，**C矩阵左上角的数为A的第一列与B的第一行的内积，其余也相应变化。**那么结果就会相反了。

PPS：上述只是拿右乘是列变换举例，左乘是行变换只是分析右侧矩阵罢了，读者可自行试验。



### 对于列向量组，“作用矩阵”时而在左、时而在右？

1. 在向量组表示/转化时，列向量组是在左边，作用矩阵C是在右边。如下式所示：

若 $\boldsymbol{\eta}_1,\boldsymbol{\eta}_2,\ldots,\boldsymbol{\eta}_n$ 和 $\boldsymbol{\xi}_1,\boldsymbol{\xi}_2,\ldots,\boldsymbol{\xi}_n$ 是 $\mathbb{R}^n$ 中的两组基，则存在过渡矩阵 $C=(c_{ij})_{n\times n}$，使得

$$
[\boldsymbol{\eta}_1,\boldsymbol{\eta}_2,\ldots,\boldsymbol{\eta}_n]
=
[\boldsymbol{\xi}_1,\boldsymbol{\xi}_2,\ldots,\boldsymbol{\xi}_n]C.
$$



2. 在求特征值问题时，特征向量作为列向量组，而作用矩阵A是在左边，如下式所示：

$$
A[\boldsymbol{\xi}_1,\boldsymbol{\xi}_2,\ldots,\boldsymbol{\xi}_n]
=
[\boldsymbol{\xi}_1,\boldsymbol{\xi}_2,\ldots,\boldsymbol{\xi}_n]
\operatorname{diag}(\lambda_1,\lambda_2,\ldots,\lambda_n).
$$



#### 看矩阵运算的不同角度
在上节中我讲过矩阵乘法从向量组的表示角度的思考结果。讨论了为何有所谓的“左行、右列”。但是问题没有这么简单。何为变换？上式中的$\vec{ξi}$经矩阵A变为新的$λi\vec{ξi}$，这不是变换吗？

所以向量组的变换有两种：

1. 向量组为一个整体，变换后的每个向量都可以用原向量组的向量**们**线性表示，**所有表示系数为变换矩阵C**。
2. 向量组只是一种“组合”，其中每个向量都是“独立”的，变换后的每一个向量，都是原向量组中**对应的那个向量**经过A变换而来。

第一式中的矩阵C对应着第一种变换中的表示系数矩阵C；第二式中求特征向量的矩阵A，是第二种变换中的A。

---

但还没有结束！**C在另一个角度看，就是A**！

---

如下所示：**α**是一个向量，所谓一个向量一组坐标，比如三维空间中$\vec{α} = \begin{bmatrix} 1\\1\\1 \end{bmatrix}$ ，但是我有一个“变换矩阵C”，它将原来坐标系的y轴转了180度，那么$ C= \begin{bmatrix} 1&0&0\\0&-1&0\\0&0&1 \end{bmatrix}$（至于为什么A是这样，读者可以验证一下，并“复习”一下初等变换矩阵），所以新坐标系的**α'**是什么呢？显然就是y坐标变为负———$\vec{α'} = \begin{bmatrix} 1\\-1\\1 \end{bmatrix} =C\vec{α} = \begin{bmatrix} 1&0&0\\0&-1&0\\0&0&1 \end{bmatrix} \cdot \begin{bmatrix} 1\\1\\1 \end{bmatrix}$  。此时α就对应于上式中的$\vec{ξi}$，而在基变换式中这个C又成了变换系数，跑到了列向量组的右边。不同的是，这时的列向量组，是被看作整体———基。下式中**x**是**α**在一组基下的坐标；**y**是**α**在另一组基下的坐标：

$$
\boldsymbol{\alpha}
=[\boldsymbol{\xi}_1,\boldsymbol{\xi}_2,\ldots,\boldsymbol{\xi}_n]\boldsymbol{x}
=[\boldsymbol{\eta}_1,\boldsymbol{\eta}_2,\ldots,\boldsymbol{\eta}_n]\boldsymbol{y}.
$$

若从基 $\boldsymbol{\xi}_1,\ldots,\boldsymbol{\xi}_n$ 到基 $\boldsymbol{\eta}_1,\ldots,\boldsymbol{\eta}_n$ 的过渡矩阵为 $C$，则

$$
[\boldsymbol{\eta}_1,\ldots,\boldsymbol{\eta}_n]
=[\boldsymbol{\xi}_1,\ldots,\boldsymbol{\xi}_n]C,
\qquad
\boldsymbol{x}=C\boldsymbol{y},
\qquad
\boldsymbol{y}=C^{-1}\boldsymbol{x}.
$$

基变换也很容易理解，比如我们在上文例子中的原坐标系的三个“基向量”i、j、k为：

$\vec{i}=\begin{bmatrix} 1\\0\\0 \end{bmatrix}, \vec{j}=\begin{bmatrix} 0\\1\\0 \end{bmatrix}, \vec{k}=\begin{bmatrix} 0\\0\\1 \end{bmatrix}, \vec{α}= 1\vec{i}+1\vec{j}+1\vec{k}=\begin{bmatrix} 1\\1\\1 \end{bmatrix}$



C矩阵变换过程：

$[\vec{i'},\vec{j'},\vec{k'}] = [\vec{i},\vec{j},\vec{k}]C, 即\begin{bmatrix} 1&0&0\\0&-1&0\\0&0&1 \end{bmatrix} =  \begin{bmatrix} 1&0&0\\0&1&0\\0&0&1 \end{bmatrix} \cdot \begin{bmatrix} 1&0&0\\0&-1&0\\0&0&1 \end{bmatrix}$

这个简单的例子应该可以理解式中看起来抽象的基变换与坐标变换过程。

#### 总结
所以是“左行右列”吗？为什么有时看起来不是这样？在向量空间中可以十分清楚的看到“全貌”———**它（变换矩阵）还是它，只是看它的角度变了。**
基变换的变换矩阵与坐标变换中的变换矩阵是“一个”，但是当它对一组“基”变换的时候，与它对一组“坐标”变换的时候，理解的角度不同，自然看起来时而在左、时而在右。而关于变换矩阵更多的细节，下节再讲。

## 坐标系变换角度看矩阵
在固定坐标系下，$A_{n\times n}\alpha=\beta$首先表示矩阵 $A$ 对向量 $\alpha$ 作线性变换，得到向量 $\beta$。当 $A$ 可逆时，它会将原空间的一组基映射为另一组基，因此也可以把 $A$ 理解为对整个 $n$ 维空间进行可逆变换；若把变换后的基视为一套新基，$A$ 也就确定了新旧坐标系之间的关系。需要注意，$A\alpha=\beta$ 描述的是向量的主动变换，而同一向量在新旧坐标系之间的坐标转换通常涉及 $A^{-1}$。这就是上一节中《看矩阵运算的不同角度》中向量空间变换的延伸。
### 可逆变换与非可逆变换
可逆矩阵就是在对n维空间坐标系进行可逆变换（不损失信息）；而不可逆矩阵的变换，是无法变出来的：
**已知可逆矩阵A与向量$\beta$，是由未知向量$\alpha$，经过$A\alpha=\beta$得到，那么一定能求出变换前的$\alpha$。而若A不可逆，则无法求出。**
换句话说：**可逆A变换后，任意不一样的两个向量还是不一样，而不可逆B变换后，一定能找到两个不一样的向量变换后一样。**
#### 投影变换
投影变换，就是一种特殊的非可逆坐标变换，以3维向量$\alpha =(x,y,z)$对X轴投影为例：就可以理解为：$A\alpha=\beta$，而A为：
$$ \begin{bmatrix} 1&0&0\\0&0&0\\0&0&0 \end{bmatrix} \cdot \begin{bmatrix} x\\y\\z \end{bmatrix} = \begin{bmatrix} x\\0\\0 \end{bmatrix}$$

#### “翻转”/镜像变换
比如上节中《看矩阵运算的不同角度》中，讲坐标空间沿XOZ面镜像，也就是将y轴反转：

$\begin{bmatrix} 1&0&0\\0&-1&0\\0&0&1 \end{bmatrix} \cdot \begin{bmatrix} x\\y\\z \end{bmatrix} = \begin{bmatrix} x\\-y\\z \end{bmatrix}$
#### 伸缩变换
这跟镜像变换有些类似，对某一个方向的伸缩，也就是对一组正交基中对应方向的基向量的“伸缩”，比如我们将一个空间的球面$x^2+y^2+z^2=1$沿z轴方向压缩成一个椭球。则：
$$\begin{bmatrix} 1&0&0\\0&1&0\\0&0&\frac{1}{2} \end{bmatrix} \cdot \begin{bmatrix} x\\y\\z \end{bmatrix} = \begin{bmatrix} x\\y\\\frac{z}{2} \end{bmatrix}$$

#### 旋转变换
这就是“传说”中那个“恐怖”的正交阵的由来。也就是我们对原空间的尺度保持不变，只旋转它，那么变换矩阵具有什么样的特性呢？
$$\begin{bmatrix} a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33} \end{bmatrix} \cdot \begin{bmatrix} x\\y\\z \end{bmatrix} = \begin{bmatrix} x'\\y'\\z' \end{bmatrix}$$

* 需要保证前后两个向量（坐标）长度不变。

### 坐标变换与微积分的“联动”
很多时候一个“复杂”的曲面。是由一个简单的（比如球面）变换而来，这时就会发现：**所谓的变换，就是一种高级的换元；同样可以理解为换元的本质是坐标系变换**。
## 线性方程组与平面交点
### 问题描述
我们假设有三个三元一次方程组成的线形方程组，则这三个方程也可以分别看作是三个平面的解析式---平面方程，则求解方程组就是找到三个平面的交点：

$$
A\boldsymbol{x}=\boldsymbol{b}
\quad\Longleftrightarrow\quad
\begin{cases}
a_{11}x+a_{12}y+a_{13}z=b_1,\\
a_{21}x+a_{22}y+a_{23}z=b_2,\\
a_{31}x+a_{32}y+a_{33}z=b_3
\end{cases}
\quad\Longleftrightarrow\quad
\begin{cases}
\boldsymbol{\alpha}_1\cdot\boldsymbol{x}=b_1,\\
\boldsymbol{\alpha}_2\cdot\boldsymbol{x}=b_2,\\
\boldsymbol{\alpha}_3\cdot\boldsymbol{x}=b_3,
\end{cases}
$$

其中 $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\boldsymbol{\alpha}_3$ 是矩阵 $A$ 的三个行向量。每个方程表示一个空间平面，方程组的解就是三个平面的公共交点。根据系数矩阵与增广矩阵的秩，有

$$
r(A\mid\boldsymbol{b})=r(A)\quad\text{或}\quad r(A)+1.
$$

前者表示方程组有解，后者表示方程组无解。

若方程组有解，则解集的维数为

$$
\dim\{\boldsymbol{x}:A\boldsymbol{x}=\boldsymbol{b}\}=3-r(A).
$$

因此可以按照 $r(A)=1,2,3$ 分为以下三类。

### $r(A)=1$

三个行向量中只有一个线性无关向量。不妨设

$$
\boldsymbol{\alpha}_2=k\boldsymbol{\alpha}_1,
\qquad
\boldsymbol{\alpha}_3=m\boldsymbol{\alpha}_1.
$$

这表示三个平面的法向量互相平行，所以三个平面只可能重合或平行。

#### $r(A\mid\boldsymbol{b})=1$：三个平面重合

此时增广矩阵没有增加新的线性无关列，常数项也满足相同的比例关系：

$$
b_2=kb_1,
\qquad
b_3=mb_1.
$$

![r(A)=1 时三个平面的空间关系1](/images/posts/matrix/ra1-1.jpeg)

方程组可以写成

$$
\begin{cases}
a_1x+a_2y+a_3z=b_1,\\
ka_1x+ka_2y+ka_3z=kb_1,\\
ma_1x+ma_2y+ma_3z=mb_1.
\end{cases}
$$

三个方程实际描述同一个平面，因此解集就是这个平面，维数为 $3-1=2$，有无穷多组解。


#### $r(A\mid\boldsymbol{b})=2$：至少两个平面平行但不重合

此时至少有一个常数项不满足原来的比例关系。例如

$$
\begin{cases}
a_1x+a_2y+a_3z=b_1,\\
ka_1x+ka_2y+ka_3z=ub_1,\\
ma_1x+ma_2y+ma_3z=wb_1,
\end{cases}
\qquad
u\ne k\quad\text{或}\quad w\ne m.
$$

以第二个平面为例，将方程两边除以 $k$ 后得到

$$
a_1x+a_2y+a_3z=\frac{u}{k}b_1.
$$

它与第一个平面法向量相同，但右端常数不同，因此二者平行且不重合。若以 $\boldsymbol{\alpha}_1$ 的方向为正方向，它们之间的有向距离为

$$
\frac{\left(\frac{u}{k}-1\right)b_1}{\lVert\boldsymbol{\alpha}_1\rVert}.
$$

所以三个平面没有公共交点，方程组无解。

![r(A)=1 时三个平面的空间关系2](/images/posts/matrix/ra1-2.jpeg)

### $r(A)=2$

三个法向量中恰有两个线性无关。不妨设 $\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2$ 线性无关，并令

$$
\boldsymbol{\alpha}_3
=p\boldsymbol{\alpha}_1+q\boldsymbol{\alpha}_2.
$$

#### $r(A\mid\boldsymbol{b})=2$：三个平面相交于同一直线

方程组有解时，常数项必须满足同样的线性关系：

$$
b_3=pb_1+qb_2.
$$

前两个平面相交于一条直线，而第三个平面包含这条交线。因此三个平面的公共交集是一条直线，解集维数为 $3-2=1$，仍有无穷多组解。

![r(A)=2 时三个平面的空间关系1](/images/posts/matrix/ra2-1.jpeg)

#### $r(A\mid\boldsymbol{b})=3$：三个平面没有公共交点

若

$$
b_3\ne pb_1+qb_2,
$$

则第三个平面相对于原本应包含前两个平面交线的位置发生了平移，不再经过那条交线。三个平面可能两两相交，也可能有两个平面平行，但不会有共同交点，因此方程组无解。

![r(A)=2 时三个平面的空间关系2](/images/posts/matrix/ra2-2.jpeg)

### $r(A)=3$

三个法向量线性无关。由于增广矩阵只有三行，此时必有

$$
r(A\mid\boldsymbol{b})=r(A)=3.
$$

矩阵 $A$ 可逆，方程组对任意 $\boldsymbol{b}$ 都有唯一解

$$
\boldsymbol{x}=A^{-1}\boldsymbol{b}.
$$

从几何上看，三个平面相交于唯一一点，解集维数为 $3-3=0$。特别地，当 $\boldsymbol{b}=\boldsymbol{0}$ 时，这个交点就是原点。

![r(A)=3 时三个平面相交于一点](/images/posts/matrix/ra3.jpeg)
