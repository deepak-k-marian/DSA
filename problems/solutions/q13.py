def reorderArray():
    arr = list(map(int, input().split()))
    index = list(map(int, input().split()))

    result = [0] * len(arr)

    for i in range(len(arr)):
        targetPos = index[i]
        result[targetPos] = arr[i]

    print(*result)


reorderArray()
