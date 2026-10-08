'''
Question:
You are given an array of integers arr[]. Your task is to reverse the given array.

URL: https://www.geeksforgeeks.org/problems/reverse-an-array/1
'''

class Solution:
    def reverseArray(self, arr):
        p1 = 0
        p2 = len(arr) - 1
        while p1 < p2:
            arr[p1], arr[p2] = arr[p2], arr[p1]
            p1 += 1
            p2 -= 1
        return arr
