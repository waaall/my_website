---
title: 心脏电生理、心脏骤停 与 急救
date: 2026-04-20
tags: [医学, 心脏]
summary: 心脏电生理、心脏骤停 与 急救的简单科普。
---

## 1. 心脏电生理简要介绍

心脏功能可拆成三个层面：

### 1.1 电活动（electrical activity）

正常起搏点为 **窦房结（SA node）**。冲动依次经：

- 心房
- **房室结（AV node）**
- 希氏束（His bundle）
- 左右束支
- 浦肯野纤维（Purkinje system）

完成有序除极与复极。

### 1.2 机械活动（mechanical contraction）

电信号触发心肌细胞兴奋-收缩耦联，产生心房与心室收缩。

### 1.3 血流动力学结果（hemodynamic output）

最终目标不是“有电”，也不是“有收缩”，而是：

- 有效搏出量（stroke volume）
- 有效动脉压
- 重要器官灌注

---

### 1.4 三者关系的临床要点

- **有电活动，不代表有脉搏**
- **有心肌微弱收缩，不代表有有效循环**
- **有节律，不代表该节律能维持灌注**

这是理解 **PEA** 和 **pseudo-PEA** 的关键。（无脉电活动，下文会讲）

参考：

- [NHLBI: How the Heart Beats](https://www.nhlbi.nih.gov/health/heart/heart-beats)

### 1.5 心电向量与导联

我们在看一根普通导线里的电流时，常常可以把它简化成沿着导线方向传播的一个矢量，因为导线细、规则，而且问题基本是一维的。
但人体不是这样。人体不是一根线，而是一个三维、形状不规则、不同组织导电性质也不一样的容积导体。心脏产生的电活动传到体表后，不再是“沿某一根线流动的电流”，而是在整个躯干内形成复杂的电位分布。这就不能简化成矢量了，而是一个矢量场，而贴片电极测到的也不是“某根导线中的电流方向”，而是体表不同位置的电位差。临床上为了便于理解，才把某一时刻心脏整体电活动近似成一个“瞬时综合电向量”，再看这个向量在各个导联方向上的表现。

我们测量某一个方向上的心电信号，一定是所有心肌细胞去极化时产生的心电向量的合（当然是向量合，满足平行四边形法则）在这个测量方向上的投影。当然，这个向量满足所有空间几何(线性代数)的运算规则，所以也可以先投影再代数加减。

参考：

- [心电图](https://b23.tv/pmpBfvW)
- [心电向量](https://b23.tv/yDdQEBt)
- [3维心电向量及其投影](https://b23.tv/SKgoomB)
- [NCBI Bookshelf: Electrocardiography](https://www.ncbi.nlm.nih.gov/books/NBK354/)

---

## 2. 不同心脏问题概念区分

### 2.1 心率过慢（bradycardia）

定义上通常指成人心率 < 60/min。
但是否构成临床问题，关键不在数字本身，而在**是否导致低灌注**。

#### 可能表现

- 头晕
- 乏力
- 晕厥
- 胸痛
- 低血压
- 意识改变

#### 常见病因

- 窦房结功能不全
- 房室传导阻滞
- 药物（β受体阻滞剂、非二氢吡啶类钙拮抗剂、地高辛等）
- 缺血
- 电解质紊乱
- 甲状腺功能异常
- 迷走张力增高

#### 临床本质

**Bradycardia 是“慢”，不是“停”。**
只要还有有效循环，就不属于心脏骤停。

参考：

- [AHA: Bradycardia](https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/bradycardia--slow-heart-rate)
- [NHLBI: Types of Arrhythmias](https://www.nhlbi.nih.gov/health/arrhythmias/types)

---

### 2.2 室颤（ventricular fibrillation, VF）

定义：心室出现**极度快速、无序、碎裂化的电活动**，心室无法形成同步有效收缩。

#### 生理学后果

- 无有效心排出量
- 无有效动脉压
- 极短时间内丧失意识
- 若不干预，迅速死亡

#### 临床归类

- 属于 **cardiac arrest rhythm**
- 属于 **shockable rhythm（可电击节律）**

#### 核心机制

VF 的问题不是“没有电”，而是**电活动过于混乱，无法组织成有效机械泵血**。

参考：

- [MedlinePlus: Ventricular fibrillation](https://medlineplus.gov/ency/article/007200.htm)
- [Mayo Clinic: Ventricular fibrillation](https://www.mayoclinic.org/diseases-conditions/ventricular-fibrillation/symptoms-causes/syc-20364523)

---

### 2.3 无脉性室速（pulseless ventricular tachycardia, pVT）

定义：心室快速节律存在，但因频率过快或机械效率极差，**无可触及脉搏、无有效循环**。

#### 临床归类

- 属于 **cardiac arrest rhythm**
- 属于 **shockable rhythm**

#### 与有脉室速的区别

区别不在 ECG 形态本身，而在**是否存在有效灌注**。

- 有脉 VT：按不稳定/稳定快速心律失常处理
- 无脉 VT：按心脏骤停处理

---

### 2.4 无脉电活动（pulseless electrical activity, PEA）

定义：存在**有组织的电活动**，但**无有效机械输出**，即无脉搏、无有效循环。

#### 临床要点

PEA 最容易误解。
它不是“心电图看着有东西，所以还行”。
恰恰相反，它提示：

> 电活动仍在，但泵血失败。

#### 常见病因

常与可逆性病因相关，经典用 **Hs and Ts** 记忆。

#### 临床归类

- 属于 **cardiac arrest rhythm**
- 属于 **non-shockable rhythm（不可电击节律）**

---

### 2.5 心静止（asystole）

定义：无可识别的有组织心电活动，通俗说法即“平线”。

#### 临床归类

- 属于 **cardiac arrest rhythm**
- 属于 **non-shockable rhythm**

#### 关键点

心静止不是“更该电击”，而是**不应盲目除颤**。
它走的是 CPR + 药物 + 找病因路径，不是除颤路径。

---

### 2.6 心脏骤停（cardiac arrest）

**Cardiac arrest 是临床状态，不是某一种 ECG 名称。**

定义核心：

- 心脏失去有效泵血功能
- 无有效循环
- 临床表现为无反应、无正常呼吸/仅濒死喘息、无脉搏

#### 其底下可对应的节律

- **VF**
- **pVT**
- **PEA**
- **asystole**

因此：

> **VF 是一种节律，cardiac arrest 是一个状态。**

参考：

- [NHLBI: What Is Cardiac Arrest?](https://www.nhlbi.nih.gov/health/cardiac-arrest)
- [MedlinePlus: Cardiac arrest](https://medlineplus.gov/ency/article/007640.htm)

---

## 3. 心脏骤停处理核心“是否可电击”

ACLS 里最重要的分法不是“快还是慢”，而是：

### 3.1 Shockable rhythms

- **VF**
- **pVT**

处理核心：

- 立即除颤（defibrillation）
- 之后马上恢复 CPR
- 按算法重复评估与高级生命支持

### 3.2 Non-shockable rhythms

- **PEA**
- **asystole**

处理核心：

- 高质量 CPR
- 尽早肾上腺素（医护场景）
- 寻找可逆病因
- 不常规除颤

参考：

- [AHA Adult Cardiac Arrest Algorithm (2025)](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf?sc_lang=en)

---

## 4. 起搏器（pacemaker）与除颤仪（defibrillator）：作用机制完全不同

### 4.1 起搏器（pacemaker）

#### 本质

输出**低能量规律电脉冲**，在心脏自身起搏或传导失败时提供节律驱动。

#### 主要适应证

- 症状性窦缓
- 高度或完全性房室传导阻滞
- 某些严重传导系统疾病

#### 生理学意义

从电生理学角度看，起搏器（Pacemaker）并非提供心脏收缩所需的机械动力，而是作为一种**外源性触发脉冲源**。

##### 起搏器的“信号补偿”本质：为何适用于心动过缓而不适用于停搏或室颤？

- **适用于心动过缓的机制（信号补偿）：** 当人体自有的窦房结（主节律器）发放频率过低或传导阻滞时，心肌细胞的静息膜电位通常是正常的，且传导通路（如希氏-浦肯野系统）具备信号传导能力。此时，起搏器释放低能量电脉冲，局部改变电极接触部位心肌细胞的跨膜电位，使其达到**阈电位（Threshold Potential）**，从而诱发动作电位（Action Potential）。局部动作电位随之沿着心肌细胞间的缝隙连接（Gap Junctions）形成多米诺骨牌式的连锁去极化，完成一次心跳。因此，起搏器是在基础网络完好的前提下，精准填补了缺失的“触发信号”。

- **无法应对心脏停搏（Asystole）或室颤（VF）的原因：**
  - **心脏停搏：** 此时心肌细胞通常伴随严重的缺血缺氧，跨膜离子泵功能衰竭，细胞膜内外离子浓度梯度丧失。即使起搏器给予局部电刺激，心肌细胞也无法产生或传导动作电位，系统处于完全丧失兴奋性的状态。
  - **心室颤动：** 心室内存在大量混乱的微型折返环（Re-entry Circuits）和异位起搏点。整个心肌网络被高频、无序的电信号占据。此时若输入一个微弱的起搏脉冲，会被彻底淹没在系统巨大的电生理“噪声”中，根本无法形成全局有效的信号夺获（Capture）。

参考：

- [NHLBI: Pacemakers - How They Work](https://www.nhlbi.nih.gov/health/pacemakers/how-it-works)

---

### 4.2 除颤仪（defibrillator）

#### 本质

输出**高能量电击**，目标是终止致命性快速室性心律失常，使异常电活动整体去极化，为窦房结或其他有组织起搏重新接管创造条件。

#### 主要适应证

- **VF**
- **pVT**

#### 设备类型

- **AED（automated external defibrillator）**
- **ICD（implantable cardioverter-defibrillator）**

#### 生理学意义

除颤仪不是“让停跳的心脏重新跳”，而是：

> **终止混乱电活动，给有组织节律恢复创造机会。** 不能“让停跳的心脏重新跳”的原因同上节中“无法应对心脏停搏（Asystole）或室颤（VF）的原因”。而和起搏器的区别主要在于电能的大小：

##### 能量阈值的电生理差异：除颤与起搏的底层逻辑

起搏与除颤在能量需求上的巨大差异，源于其干预电生理系统的目标截然不同：**起搏旨在“局部激发”，而除颤旨在“全局强制复位”。**

- **起搏能量低的物理基础（局部激发的阈值）：**
  起搏器通常仅需微焦耳级别的能量。其任务极小，仅需使电极尖端周围几毫米范围内的心肌细胞去极化。一旦突破这局部细胞的电位阈值，后续的信号蔓延完全依赖心肌自身的离子通道级联反应（即利用心肌自身的电化学势能传导信号）。

- **除颤能量高的必要性（全局去极化与状态重置）：**
  除颤仪（Defibrillator）释放的能量通常高达数百焦耳。除颤的本质**不是启动心跳，而是强行终止所有混乱的电活动**。
  高能量瞬时直流电必须形成足够强的电场，瞬间穿透整个心脏组织，强制绝大多数心肌细胞在同一毫秒内发生**完全去极化（Global Depolarization）**，并迫使它们集体进入**绝对不应期（Absolute Refractory Period）**。这种硬性的“状态清零”阻断了所有异常的折返放电，为最高层级的起搏节点（窦房结）重新接管系统的节律控制权创造出短暂的静息窗口。

- **起搏能量无法除颤的必然性：**
  低能量起搏脉冲的电场强度极其有限，无法覆盖整个心肌团，更无法强制那些正处于兴奋或不应状态的异位细胞群强行同步。因此，起搏器无法平息室颤的电生理风暴，必须依赖除颤仪的高压直流电场进行物理层级的强制复位。

参考：

- [NHLBI: What Are Defibrillators?](https://www.nhlbi.nih.gov/health/defibrillators)
- [Mayo Clinic: Implantable cardioverter-defibrillator (ICD)](https://www.mayoclinic.org/tests-procedures/implantable-cardioverter-defibrillators/about/pac-20384692)

---

### 4.3 两者对照

| 项目                      | 起搏器 pacemaker     | 除颤仪 defibrillator |
| ------------------------- | -------------------- | -------------------- |
| 能量水平                  | 低能量               | 高能量               |
| 目标问题                  | 太慢、传导差         | 太乱、致命室性快心律 |
| 典型适应证                | 症状性缓慢性心律失常 | VF / pVT             |
| 生理作用                  | 提供节拍             | 终止异常节律         |
| 是否用于常规 asystole/PEA | 否                   | 否                   |

---

## 5. 心脏骤停现场急救流程

### 5.1 识别

高度怀疑心脏骤停的典型现场表现：

- 突然倒地
- 无反应
- 无正常呼吸或仅濒死喘息
- 无脉搏（专业人员评估）

---

### 5.2 启动救援链

- 呼叫急救系统
- 请求旁人拿 AED
- 立即开始 CPR

---

### 5.3 高质量 CPR 要点

- 按压频率：**100 到 120 次/分**
- 按压深度：**至少 5 cm，避免超过 6 cm**
- 减少中断
- 允许胸廓完全回弹
- 训练者可做 **30:2**
- 未训练者至少做 **Hands-Only CPR**

#### CPR 的生理学作用

CPR 的首要任务不是“把节律按正常”，而是：

- 提供最低限度冠脉灌注
- 维持脑灌注
- 延缓心肌进一步能量耗竭
- 为后续除颤或 ROSC 创造条件

参考：

- [AHA: Adult Basic Life Support](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support)
- [AHA: What Is CPR](https://cpr.heart.org/en/resources/what-is-cpr)
- [American Red Cross: CPR Steps](https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps)

---

### 5.4 AED 的作用

AED 的本质不是“自动救活机器”，而是：

1. 识别节律
2. 判断是否为 shockable rhythm
3. 仅在合适时建议电击

#### AED 提示 shock advised

- 清开接触
- 给予电击
- 立刻恢复 CPR

#### AED 提示 no shock advised

- 继续 CPR
- 不应因“没电击”而误以为没希望或没事

参考：

- [American Red Cross: AED Steps](https://www.redcross.org/take-a-class/aed/using-an-aed/aed-steps)
- [AHA Adult Cardiac Arrest Algorithm (2025)](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf?sc_lang=en)

---

## 6. CPR 后的现象分三类

每约 2 分钟 CPR 后，临床核心问题只有两个：

1. **有没有 ROSC？**
2. **如果没有 ROSC，是不是 shockable rhythm？**

因此自然分为三类：

---

### 6.1 第一类：ROSC（return of spontaneous circulation）

定义：恢复自主循环。
关键不是 ECG 漂不漂亮，而是是否已有**有效灌注**，例如：

- 可触及脉搏
- 可测血压
- 动脉波形恢复
- 循环表现改善

#### 处理

进入 **post-cardiac arrest care**：

- 气道与氧合管理
- 血压支持
- 12 导联心电图
- 查找病因
- 重症监护管理
- 必要时冠脉评估/介入等

参考：

- [AHA Adult Post–Cardiac Arrest Care Algorithm](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/PCAC-Algorithm-ACLS-PCAC-250527.pdf?sc_lang=en)

---

### 6.2 第二类：无 ROSC，但为 VF / pVT

这类属于 **shockable**。

#### 处理

- 立即除颤
- 电击后立刻继续 CPR
- 高级生命支持下建立 IV/IO
- 药物治疗
- 持续寻找病因

#### 关键点

电击不是终点。
**电击后马上恢复按压** 才是标准动作。

---

### 6.3 第三类：无 ROSC，且为 PEA / asystole

这类属于 **non-shockable**。

#### 处理

- 持续高质量 CPR
- 尽早肾上腺素（医护场景）
- 反复评估
- 查找并纠正 **Hs and Ts**
- 只有在之后真正转成 VF/pVT 时才改走电击路径

#### Hs & Ts

“Hs and Ts” 是高级心脏生命支持（ACLS）中用于排查**可逆病因（reversible causes）**的一套标准化检查框架，主要用于 **无脉电活动（PEA）** 和 **心静止（asystole）** 等**不可电击节律（non-shockable rhythms）** 的复苏场景。

其核心意义在于：这类患者的处理重点通常**不是除颤**，而是**在持续高质量 CPR 的同时，尽快识别并纠正导致循环崩溃的根本原因**。
换句话说，复苏不仅是“维持生命体征”，也是“寻找并修复导致停搏的底层故障”。

##### 核心逻辑：从节律处理转向病因处理

- **对于可电击节律（VF / pVT）**：处理重点是尽快除颤，以终止致命性室性快速心律失常。
- **对于不可电击节律（PEA / asystole）**：处理重点是高质量 CPR、药物支持，以及系统排查可逆病因。

需要特别注意的是，**PEA 并不等于“没有电活动”**。
PEA 的定义是：**监护上存在有组织的电活动，但没有可触及脉搏或有效循环。**
而 **asystole** 则是**无可识别的有组织心脏电活动**。

##### 5 个 H：常见生理与代谢性原因

| 缩写                        | 全称                | 临床含义                                                               |
| --------------------------- | ------------------- | ---------------------------------------------------------------------- |
| **Hypovolemia**             | **低血容量**        | 循环血量不足，如大出血、严重脱水等，导致心脏无法维持有效前负荷与灌注。 |
| **Hypoxia**                 | **缺氧**            | 氧供严重不足，导致心肌和重要器官无法维持正常代谢。                     |
| **Hydrogen ion (acidosis)** | **酸中毒**          | 严重酸中毒可抑制心肌收缩与电活动稳定性。                               |
| **Hypo-/Hyperkalemia**      | **低钾 / 高钾血症** | 电解质紊乱可显著影响心肌细胞膜电位和传导功能。                         |
| **Hypothermia**             | **低体温**          | 低体温可导致代谢减慢、传导异常和心肌功能受损。                         |

##### 5 个 T：常见机械性、结构性或毒性原因

| 缩写                       | 全称                | 临床含义                                                 |
| -------------------------- | ------------------- | -------------------------------------------------------- |
| **Tension pneumothorax**   | **张力性气胸**      | 胸腔高压压迫肺和大血管，导致静脉回流和心排出量急剧下降。 |
| **Tamponade (cardiac)**    | **心包填塞**        | 心包腔积液或积血压迫心脏，使其无法充分舒张和充盈。       |
| **Toxins**                 | **毒物 / 药物中毒** | 某些药物或毒物可直接抑制心肌、传导系统或呼吸循环。       |
| **Thrombosis (pulmonary)** | **肺栓塞**          | 大块肺动脉栓塞可导致右心衰竭和循环骤停。                 |
| **Thrombosis (coronary)**  | **冠脉血栓**        | 急性冠脉闭塞可引发严重缺血、恶性心律失常或泵衰竭。       |

##### 在复苏现场如何应用

在每一轮 CPR 过程中，团队通常一边维持标准复苏操作，一边并行思考 Hs and Ts：

- 是否存在明显失血、脱水或回流不足？
- 是否存在缺氧、通气不足或气道问题？
- 是否提示高钾、酸中毒或其他代谢紊乱？
- 是否可能存在张力性气胸、心包填塞、肺栓塞或急性冠脉事件？
- 是否有药物过量、中毒或特殊暴露史？

必要时可结合床旁超声、血气、电解质、病史和现场线索进行快速判断，但前提是不应明显中断高质量 CPR。

##### 参考

- [AHA Adult Cardiac Arrest Algorithm (2025)](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf?sc_lang=en)

---

## 7. CPR 后三种情况的“比例”

### 7.1 公开数据库通常报告什么？

大型院外心脏骤停注册最常报告的是：

- **初始节律（initial rhythm）**
- **最终是否达到 ROSC**
- 生存到住院、出院等结局

它们**通常不直接给出**：

> “每一轮 CPR 之后，三种状态各占多少”的逐轮实时互斥表。

所以任何“CPR 后三类精确比例表”如果写得过于斩钉截铁，往往都存在口径问题。

---

### 7.2 基于成人 OHCA 大样本

以 **CARES 2024** 为例：

#### 初始节律分布

- **初始 shockable rhythm**：约 **18.1%**
- **初始 non-shockable rhythm**：约 **81.9%**

其中 non-shockable 大致包括：

- asystole：**50.6%**
- PEA/idioventricular：**22.5%**
- unknown unshockable：**8.8%**

#### 复苏过程中的结果

- **sustained ROSC**：约 **25.4%**

参考：

- [CARES 2024 Non-Traumatic National Summary Report](https://mycares.net/sitepages/uploads/2025/CARES%202024%20Non-Traumatic%20National%20Summary%20Report%20.pdf)

---

### 7.3 这些比例解释

- **18.1% / 81.9%**：在问“患者一开始是什么节律？”
- **25.4%**：在问“后来有没有恢复自主循环？”

它们是**重叠关系**，不是互斥分箱。

#### 例子

某患者：

- 初始为 asystole
- 经过 CPR 后 ROSC

这个患者同时属于：

- 初始 non-shockable
- 最终 ROSC

---

### 7.4 现场经验

- 约 **1/4** 患者在复苏过程中某个时点可达到 **ROSC**
- 若尚未 ROSC，则**多数仍处于 non-shockable 路径**
- 真正需要除颤的 **VF/pVT 是少数，但必须被尽快识别并处理**

---

## 8. 病因 与 Hs&Ts的区别

冠状动脉疾病、预激综合征、长QT间期综合征、心肌炎这几类疾病，是**心源性猝死（sudden cardiac death, SCD）**的重要原因或风险来源。

为什么不写在 Hs and Ts 里？它们与 **Hs and Ts** 并不是同一层级的分类。

### 8.1 这几种疾病属于什么？

它们更适合归入**基础心脏疾病 / 猝死底盘（underlying substrate）**这一类，也就是回答：

> **“这个人为什么有更高概率发生致命性心律失常或心源性猝死？”**

例如：

- **冠状动脉疾病（coronary artery disease, CAD）**：是中老年人心源性猝死最重要的原因之一，尤其与心肌缺血、心肌梗死后瘢痕和室性心律失常密切相关。
- **预激综合征（Wolff-Parkinson-White syndrome, WPW）**：可因旁路传导引发快速心律失常，少数情况下可导致猝死。
- **长QT间期综合征（long QT syndrome, LQTS）**：属于遗传性或获得性电生理异常，可诱发尖端扭转型室速、室颤和猝死。
- **心肌炎（myocarditis）**：可通过炎症、瘢痕、传导异常或室性心律失常导致猝死，尤其在年轻人和运动人群中值得警惕。

#### 关于 LQTS

别的我也不太懂，就不展开了，这个QT间期跟上文的心脏电生理息息相关。从电生理来看：心脏的动作电位依赖于钠、钾、钙离子的进出。QT 间期的长短主要由**心肌复极（Repolarization）**的速度决定，这主要靠钾离子流出细胞来完成。

- 钾通道“功能丧失”（Loss of Function）： 这是最常见的原因。负责让钾离子流出（就像排空电容器）的通道（如 I*{Ks} 或 I*{Kr}）效率低下，导致细胞电位降不下来，复极时间被迫延长。
- 钠通道“功能亢进”（Gain of Function）： 理论上钠通道在放电后应迅速关闭，但如果它“关不严”导致钠离子持续内流，就会抵消钾离子的努力，同样拖慢复极速度。

当复极过程（即动作电位的第 2、3 时相）被显著拖延时，心肌细胞会处于一种极度不稳定的状态。

- 钙离子通道的“误操作”： 由于复极太慢，原本已经关闭的 L-型钙通道可能会因电位长时间维持在高位而意外重新开启。
- 早后除极（Early After-Depolarization, EAD）： 这股意外的钙电流会产生一个额外的微小电压波动。如果这个波动足够大，就会在心脏还没彻底完成上一次“充电”时，强行触发一次提前的“放电”。

### 8.2 Hs and Ts 属于什么？

**Hs and Ts** 属于 **ACLS（高级心脏生命支持）** 中的**可逆病因检查框架（reversible causes checklist）**，主要回答的是另一个问题：

> **“这个人现在已经心脏骤停了，在 CPR/复苏现场，有没有马上可以识别并处理的可逆原因？”**

AHA 成人心脏骤停算法中，Hs and Ts 被放在 **“Treat reversible causes”** 下，重点用于 **PEA（无脉电活动）** 和 **asystole（心静止）** 等**不可电击节律**的复苏处理中。

### 8.3 这两类的核心区别

可以把它们理解为两个不同问题：

#### （1）SCD 病因

这是**上游病因学**视角，关注的是：

- 为什么这个人本身容易发生致命性室性心律失常？
- 是否存在结构性心脏病、遗传性心律失常、炎症、缺血等长期风险因素？

这一层会包括：

- CAD
- WPW
- LQTS
- 心肌炎
- 各类心肌病
- 冠脉畸形等

#### （2）Hs and Ts

这是**复苏现场处理**视角，关注的是：

- 患者已经停搏或处于 PEA/asystole
- 此时有没有一个在几分钟内可能被纠正的直接触发因素？
- 是否存在必须立即针对性处理的问题？

因此，Hs and Ts 不是“猝死病因大全”，而是“**心脏骤停现场的可逆病因速查表**”。

为什么 CAD 能部分“出现在” Hs and Ts 中，而 WPW/LQTS/心肌炎通常不直接出现？这是因为：

- **慢性 CAD** 是一种基础疾病，但它的**急性事件形式**，例如 **冠脉血栓（coronary thrombosis）**，正好属于 Hs and Ts 中的 **T**。
- **WPW、LQTS、心肌炎** 更多属于“让患者容易进入恶性心律失常或猝死”的**上游疾病状态**，通常不是复苏现场那几分钟内可立即逆转的标准 Hs and Ts 条目。

换句话说：

- **CAD** 既可以是长期问题，也可能在急性发作时表现为 Hs and Ts 中的 **冠脉血栓**
- **WPW / LQTS / 心肌炎** 通常更多是“致心律失常背景”，而不是 Hs and Ts 这类“立即可逆触发因素”

### 参考

- [AHA 2025 Adult Cardiac Arrest Algorithm](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-CA-LngDscrp-250725-Ed.pdf?sc_lang=en)
- [AHA: Causes of Cardiac Arrest](https://www.heart.org/en/health-topics/cardiac-arrest/causes-of-cardiac-arrest)
- [NHLBI: Wolff-Parkinson-White Syndrome](https://www.nhlbi.nih.gov/health/wolff-parkinson-white-syndrome)
- [Mayo Clinic: Long QT syndrome - Symptoms and causes](https://www.mayoclinic.org/diseases-conditions/long-qt-syndrome/symptoms-causes/syc-20352518)
- [ESC: Common cardiovascular diseases causing sudden cardiac death in athletes](https://www.escardio.org/communities/councils/cardiology-practice/scientific-documents-and-publications/ejournal/volume-19/how-do-you-answer-a-20-year-old-when-they-ask-can-i-participate-in-competition/)
- [ESC 2022 Guidelines: Ventricular arrhythmias and the prevention of sudden cardiac death](https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/ventricular-arrhythmias-and-the-prevention-of-sudden-cardiac-death/)

## 9. 参考文献

1. [NHLBI: How the Heart Beats](https://www.nhlbi.nih.gov/health/heart/heart-beats)
2. [心电图](https://b23.tv/pmpBfvW)
3. [心电向量](https://b23.tv/yDdQEBt)
4. [3维心电向量及其投影](https://b23.tv/SKgoomB)
5. [NCBI Bookshelf: Electrocardiography](https://www.ncbi.nlm.nih.gov/books/NBK354/)
6. [AHA: Bradycardia](https://www.heart.org/en/health-topics/arrhythmia/about-arrhythmia/bradycardia--slow-heart-rate)
7. [NHLBI: Types of Arrhythmias](https://www.nhlbi.nih.gov/health/arrhythmias/types)
8. [MedlinePlus: Ventricular fibrillation](https://medlineplus.gov/ency/article/007200.htm)
9. [Mayo Clinic: Ventricular fibrillation](https://www.mayoclinic.org/diseases-conditions/ventricular-fibrillation/symptoms-causes/syc-20364523)
10. [NHLBI: What Is Cardiac Arrest?](https://www.nhlbi.nih.gov/health/cardiac-arrest)
11. [MedlinePlus: Cardiac arrest](https://medlineplus.gov/ency/article/007640.htm)
12. [AHA Adult Cardiac Arrest Algorithm (2025)](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-ACLS-CA-250527.pdf?sc_lang=en)
13. [NHLBI: Pacemakers - How They Work](https://www.nhlbi.nih.gov/health/pacemakers/how-it-works)
14. [NHLBI: What Are Defibrillators?](https://www.nhlbi.nih.gov/health/defibrillators)
15. [Mayo Clinic: Implantable cardioverter-defibrillator (ICD)](https://www.mayoclinic.org/tests-procedures/implantable-cardioverter-defibrillators/about/pac-20384692)
16. [AHA: Adult Basic Life Support](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support)
17. [AHA: What Is CPR](https://cpr.heart.org/en/resources/what-is-cpr)
18. [American Red Cross: CPR Steps](https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps)
19. [American Red Cross: AED Steps](https://www.redcross.org/take-a-class/aed/using-an-aed/aed-steps)
20. [AHA Adult Post–Cardiac Arrest Care Algorithm](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/PCAC-Algorithm-ACLS-PCAC-250527.pdf?sc_lang=en)
21. [CARES 2024 Non-Traumatic National Summary Report](https://mycares.net/sitepages/uploads/2025/CARES%202024%20Non-Traumatic%20National%20Summary%20Report%20.pdf)
22. [AHA 2025 Adult Cardiac Arrest Algorithm](https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-CA-LngDscrp-250725-Ed.pdf?sc_lang=en)
23. [AHA: Causes of Cardiac Arrest](https://www.heart.org/en/health-topics/cardiac-arrest/causes-of-cardiac-arrest)
24. [NHLBI: Wolff-Parkinson-White Syndrome](https://www.nhlbi.nih.gov/health/wolff-parkinson-white-syndrome)
25. [Mayo Clinic: Long QT syndrome - Symptoms and causes](https://www.mayoclinic.org/diseases-conditions/long-qt-syndrome/symptoms-causes/syc-20352518)
26. [ESC: Common cardiovascular diseases causing sudden cardiac death in athletes](https://www.escardio.org/communities/councils/cardiology-practice/scientific-documents-and-publications/ejournal/volume-19/how-do-you-answer-a-20-year-old-when-they-ask-can-i-participate-in-competition/)
27. [ESC 2022 Guidelines: Ventricular arrhythmias and the prevention of sudden cardiac death](https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/ventricular-arrhythmias-and-the-prevention-of-sudden-cardiac-death/)
