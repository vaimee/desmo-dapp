# Overview

In that section is explained the algorithm used to obtain the best value from **S** sources and **N** requests from the same sources.

- **S** number of sources.
- **N** number of the request for the same source with a period of **T**.
- **T** minimum time between two requests at the same source.
- **s** source
- **r** request to **s**
- **v** result of a request (**r**) to **s**
- **t** time of the return of **v** from **s**

Note:
Consider **r0** as the first request to **s** and **x0** as the date-time at the beginning of the request.
Consider **r1** as the second request to **s** and **x1** as the date-time at the beginning of the request.
Then: 
**x1**-**x0**>=**T**

# Algorithm on numbers

Each row of that table represent a source (**0 to S**), each collumn represent the requests following the period **T** (**0 to N**).
The content of the cells is the couple **v** value and **t** time, where **t** is the date of the retriev data from the source **s**

1)All data in matrix form 

| r0            | r1            | rx          | rN            |
| ------------- | ------------- | ------------- | ------------- |
| (v0_0,t0_0)   | (v1_0,t1_0)   | (vx_0,tx_0)   |   (vN_0,tN_0) |
| (v0_1,t0_1)   | (v1_1,t1_1)   | (vx_1,tx_1)   |   (vN_1,tN_1) |
| (v0_i,t0_i)   | (v1_i,t1_i)   | (vx_i,tx_i)   |   (vN_i,tN_i) |
| (v0_S,t0_S)   | (v1_S,t1_S)   | (vx_S,tx_S)   |   (vN_S,tN_S) |

2)Construct a matrix of value with sync on data period

1. **maxS** as the maximum of t0_i, i in [0,S]
2. **mimE** as the minimum of tN_i, i in [0,S]
3. **newT** as the new period in order to sync the values, **newT**=**minE** - **maxS**/**N**
5. for each **i** in [0,S] and each **x** in [0,N] is calculate a new value:
  1. **newT_x** as the time at **x** using that new sync period **new_T**, **newT_x**=**maxS**+**newT** * **x** where **x** in [0,N]
  2. take the cell of the original matrix, where the date is closer to **tx_i** >=  **newT_x** as **(v_e,t_e)**
  3. take the cell of the original matrix, where the date is closer to **tx_i** <=  **newT_x** as **(v_s,t_s)**
  4. calculate **sv_x_i**=(((**newT_x**-t_e)/(t_s-t_e))*(v_s-v_e))+v_e

the result matrix is:

| r0                | r1                | rx                    | rN            |
| -------------     | -------------     | -------------         | ------------- |
| (sv_0_0,newT_0)   | (sv_1_0,newT_1)   | (sv_x_0,newT_x)   |   (sv_3_S,newT_3) |
| (sv_0_1,newT_0)   | (sv_1_1,newT_1)   | (sv_x_1,newT_x)   |   (sv_3_S,newT_3) |
| (sv_0_i,newT_0)   | (sv_1_i,newT_1)   | (sv_x_i,newT_x)   |   (sv_3_i,newT_3) |
| (sv_0_S,newT_0)   | (sv_1_S,newT_1)   | (sv_x_S,newT_x)   |   (sv_3_S,newT_3) |

3)Autocorrelation: find out the standard deviation between all the captured value of the same source

1. discard all punished sources (a source is punished if return at least one not valid value like "null" or the request goes out of time)
2. for each source **i** take the corresponding values **sv_x_i** (it is a list of values with **x** in [0,N])
3. calculate the standard deviation of **sv_x_i** as **sds_i** for each **i** in [0,S]
4. calculate the media of **sds_i** with **i** in [0,S] as **best_fluct**

4)Select the best source looking at how much these values fluctuates as **best_i**, the source index with the closer **sds_i** to the media of all **sds_i** with **i** in [0,S].

5)Crosscorrelation: standard deviation between the captured value from the same source in different time 

1. discard all punished sources (a source is punished if return at least one not valid value like "null" or the request goes out of time)
2. for each time **x** in [0,N] take the corresponding value **sv_x_i** (it is a list of values with **i** between [0,S])
3. calculate the standard deviation of **sv_x_i** as **sdt_x** with **x** in [0,N]

6)Get the **r** with the minimum standard deviation based on time, the request time slot index with the minimum of **sdt_x**  with **x** in [0,N] as **best_x**.

7)Find the best real value (real value, because it will come from the first matrix)

1. get the best value **best_value** of the second matrix, taking the cell at collumn **best_x** and row **best_i**
2. get the closer real value **best_real_value** (from the first matrix) to the **best_value** of the second matrix, searching only in the corresponding source **i** = **best_i**  of the first matrix

EXAMPLE)

6 sources and 4 request with 2 value not valid:
```
 [
  [ 2.11, 2.2, 2.52, 2.75 ],
  [ 2.2, 2.44, 2.44, 2.8 ],
  [ 2.4, 2.4, 2.4, 2.4 ],
  [ 2.15, null, 2.82, 2.99 ],   //Source_3 received not valid value., discarded
  [ 2.14, 2.1, 2.3, 2.67 ],
  [ null, 2.66, 2.33, 2.71 ]    //Source_5 received not valid value., discarded
]
```

###Original matrix:
| x=0| x=1| x=2| x=3|
| ------------- | ------------- | ------------- | ------------- |
| (2.11,312)| (2.2,639)| (2.52,907)| (2.75,1262)|
| (2.2,156)| (2.44,783)| (2.44,938)| (2.8,1477)|
| (2.4,281)| (2.2,531)| (2.4,953)| (2.4,1308)|
| (2.14,312)| (2.1,844)| (2.29,1232)| (2.67,1730)|

###Sync matrix with **sds_i** and **sdt_x**:

| **sds_i** | x=0| x=1| x=2| x=3|
| ------------- | ------------- | ------------- | ------------- | ------------- |
| 0.22|(2.11,312)| (2.17,549.5)| (2.43,787)| (2.59,1024.5)|
| 0.14|(2.25,1262)| (2.35,1499.5)| (2.39,1737)| (2.59,1974.5)|
| 0.01|(2.37,2212)| (2.4,2449.5)| (2.4,2687)| (2.4,2924.5)|
| 0.07| (2.14,3162)| (2.12,3399.5)| (2.1,3637)| (2.26,3874.5)|
| **sdt_x** |0.12| 0.13 |0.15| 0.16|

**best_fluct** = 0.11

**best_i** = 1

**best_x** = 0

**best_value** = 2.25

**best_real_value** = 2.2

# Algorithm on stings

WIP
