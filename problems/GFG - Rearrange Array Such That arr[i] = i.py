'''
Question:
Given an array of elements of size n, ranging from 0 to n-1. All elements may not be present in the array. If the element is not present then there will be -1 present in the array. Rearrange the array such that arr[i] = i and if i is not present then display -1 at that index.

URL: https://www.geeksforgeeks.org/problems/rearrange-an-array-such-that-arri-i3618/1
'''

class Solution:
    def modifyArray(self, arr):
        present = set(arr)
        for i in range(len(arr)):
            arr[i] = i if i in present else -1
        return arr
