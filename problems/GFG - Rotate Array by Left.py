'''
Question:
Rotate the Array by left n times using Reverse Algorithm
'''

def leftRotation():
    k = int(input("Enter number of rotations: "))
    arr = list(map(int, input("Enter array elements: ").split()))
    if not arr:
        return
    k %= len(arr)
    print(*(arr[k:] + arr[:k]))

leftRotation()
