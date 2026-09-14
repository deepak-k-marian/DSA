def findGreatestNumbers(numbers: List[int]) -> str:

    firstGreatest = secondGreatest = -1
    # Changed initial index tracking values to -1 to represent "not found" cleanly
    firstIndex = secondIndex = -1 

    for index, number in enumerate(numbers):
        if number > firstGreatest:
            secondGreatest = firstGreatest
            secondIndex = firstIndex
            firstGreatest = number
            firstIndex = index
        elif number > secondGreatest and number != firstGreatest:
            secondGreatest = number
            secondIndex = index

    # Perform the 1-based index conversion strictly at the end when printing
    return f"First greatest: {firstGreatest} | index = {firstIndex + 1} \nSecond greatest: {secondGreatest} | index = {secondIndex + 1}"

print(findGreatestNumbers([10, 29, 9, 47, 26]))