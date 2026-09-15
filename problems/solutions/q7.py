def firstAndLastOccur():
    arrSize, targetEle = map(int, input().split())
    # Removed the redundant 'arr = [0] * arrSize' line as list() overwrites it anyway
    arr = list(map(int, input().split()))

    if arrSize == 0:
        return -1, -1

    if arrSize == 1:
        if arr[0] == targetEle:
            return 0, 0
        else:
            return -1, -1

    if len(arr) != arrSize:
        return "Invalid Input - Array Size Mismatch"

    p1 = 0
    p2 = len(arr) - 1  # Adjusted to point to the last valid index
    p1TarPos = p2TarPos = -1

    # Using a while loop to move your pointers inward step-by-step
    while p1 <= p2:
        if arr[p1] == targetEle:
            p1TarPos = p1
        else:
            p1 += 1  # Move p1 forward only if target isn't found yet

        if arr[p2] == targetEle:
            p2TarPos = p2
        else:
            p2 -= 1  # Move p2 backward only if target isn't found yet

        # If both pointers have locked onto their targets, we can stop early
        if p1TarPos != -1 and p2TarPos != -1:
            break

    return p1TarPos, p2TarPos


print(firstAndLastOccur())


'''
Also this is valid for smaller ones:

def firstAndLastOccur():
    n, t = map(int, input().split())	
    arr = list(map(int, input().split()))
    if len(arr) != n:
        return "Invalid Input - Array Size Mismatch"
    try:
        return arr.index(t), n - 1 - arr[::-1].index(t)
    except ValueError:
        return -1, -1

print(firstAndLastOccur())
'''