'''
Question:
Given a sorted array of positive integers. Your task is to rearrange the array elements alternatively i.e first element should be max value, second should be min value, third should be second max, fourth should be second min and so on.

URL: https://www.geeksforgeeks.org/problems/-rearrange-array-alternately-1587115620/1
'''

class Solution:
    def rearrange(self, arr):
        arr.sort()
        result = []
        n = len(arr)

        for i in range(n // 2):
            result.append(arr[n - 1 - i])
            result.append(arr[i])

        if n % 2 != 0:
            result.append(arr[n // 2])

        arr[:] = result
