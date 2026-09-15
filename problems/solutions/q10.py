def rightRotation():
    k = int(input())
    arr = list(map(int, input().split()))
    k %= len(arr)
    print(*(arr[-k:] + arr[:-k]))


rightRotation()
