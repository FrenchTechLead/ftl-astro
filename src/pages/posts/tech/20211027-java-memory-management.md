---
setup: |
  import Layout from '@layouts/BlogPost.astro'
  import Separator from '@comps/Separator.astro'
title: Java Memory Management
publishDate: October 27, 2021
name: FrenchTechLead
value: 128
description: "In this short article, I’ll try to briefly explain how Java manages Random Access Memory (RAM), explaining the basics of garbage collecting, the two main Memory types in Java, Memory Leaks: how to diagnose them and how to ensure that your application handles the memory the right way."
---

![Java Memory Management](/assets/blog/tech/20211027-java-memory-management/1.png "Java Memory Management")

In this short article, I’ll try to briefly explain how Java manages Random Access Memory (RAM), explaining the basics of garbage collecting, the two main Memory types in Java, Memory Leaks: how to diagnose them and how to ensure that your application handles the memory the right way.

<Separator />

## Types of memories in a computer

| Type                       | Usage                                                                                                                                   |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Read Only Memory (ROM)     | - Read Only.<br /> - Required for computer startup, BIOS.                                                                               |
| Disc Memory (HDD/SDD)      | - Read/Write.<br /> - Contains large files, eg: Operation Systtem, multimedia files, etc.<br/> - Low R/W speed.                         |
| Random Access Memory (RAM) | - Read/Write.<br /> - Its content is deleted on restart.<br/> - Necessary for the operation of any application. <br/> - High R/W speed. |

We find in a computer three main types of memories, **Read-Only Memory (ROM)** is physically contained on the motherboard of the computer, it contains the programming needed to start a PC, which is essential for boot-up; it performs major input/output tasks and holds programs or software instructions, on the other hand, **Disc Memory** is used for containing large files such as operating systems and multimedia files, it has a low Read/Write speed comparing to RAM.

**Random Access Memory (RAM)** is a volatile type of memory, which means that its content is not permanent, it only exists for a short period of time during the execution of software, in other words, RAM provides storage for input data that the processor handles and storage for the resulting output data.

<Separator />

## How does the JVM use RAM?
![Java Memory Management](/assets/blog/tech/20211027-java-memory-management/2.png "Java Memory Management")
The Java Virtual Machine (JVM) uses RAM memory in two main ways, the first one is the **Stack**, it’s an ordered data structure that can be compared to books that are put one on top of each other, the second one is **Heap** which has no particular order.