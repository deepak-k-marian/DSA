'''
Question:
Alternate positive and negative numbers
Given an unsorted array arr containing both positive and negative numbers. Your task is to create an array of alternate positive and negative numbers without changing the relative order of positive and negative numbers.
Note: Array should start with a positive number and remaining numbers of the larger family should be appended at the end of the array.

URL: https://www.geeksforgeeks.org/problems/array-of-alternate-ve-and-ve-nos1401/1
'''

class Solution:
    def rearrange(self, arr):
        # p -> positive
        # n -> negative
        p = [x for x in arr if x >= 0]
        n = [x for x in arr if x < 0]

        i = 0
        p_idx, n_idx = 0, 0

        while p_idx < len(p) and n_idx < len(n):
            if i % 2 == 0:
                arr[i] = p[p_idx]
                p_idx += 1
            else:
                arr[i] = n[n_idx]
                n_idx += 1
            i += 1

        while p_idx < len(p):
            arr[i] = p[p_idx]
            p_idx += 1
            i += 1

        while n_idx < len(n):
            arr[i] = n[n_idx]
            n_idx += 1
            i += 1

        return arr
