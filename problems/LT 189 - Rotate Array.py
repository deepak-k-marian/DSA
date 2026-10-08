'''
Question:
Right Rotation (Clockwise) - n times
Consider index only from 0 to n-1
'''

def rightRotation():
    k = int(input())
    arr = list(map(int, input().split()))
    k %= len(arr)
    print(*(arr[-k:] + arr[:-k]))

rightRotation()
