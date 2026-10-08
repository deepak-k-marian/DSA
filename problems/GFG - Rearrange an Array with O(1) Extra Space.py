'''
Question:
Given an array arr[] of size n where every element is in the range from 0 to n-1. Rearrange the given array so that arr[i] becomes arr[arr[i]] with O(1) extra space.

URL: https://www.geeksforgeeks.org/problems/rearrange-an-array-with-o1-extra-space3142/1
'''

class Solution:
    def arrange(self, arr):
        n = len(arr)
        for i in range(n):
            arr[i] += (arr[arr[i]] % n) * n
        for i in range(n):
            arr[i] //= n

        return arr
