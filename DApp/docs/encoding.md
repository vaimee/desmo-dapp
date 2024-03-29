# Overview

The encoding is used to build a string hex which will contain the result of the query and the list with the reward/punishment of the Directories
We have 3 types of encoding-decoding:

# Algorithm based on a manual encoding

The following schema represent an hex string, where

1. **sd** is the size of the directories payload that can be found at (1,sd+1) char of the hex string (**d**).
2. **d** is the hex string that contains the reward/punishment of the Directories. Each hex char will contain 4 Directory scores (Max directories: 16).
3. **tr** is the Type of the result stored in the **data** part of the hex string, for example, '0100' is a string result.
4. **ps** is the size of the hex char used to represent **precision**.
5. **precision** is an integer that represents the precision of the floating-point of the number.

![ManualLightEncoding.png](ManualLightEncoding.png)