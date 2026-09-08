'''
Question:
Find the first greatest and second greatest numbers in a list of numbers.

Condition:
- Without using built-in functions like max() or sort().
- And no built-in libraries like numpy or pandas.
- The solution should be implemented using basic Python constructs such as loops and conditionals.

Constraints:
- The input list will contain at least two elements.
- All elements in the list will be positive integers.

I/P:
[10, 29, 9, 47, 26]

O/P:
First greatest: 47 | index = 4 
Second greatest: 29 | index = 2

Note: the index is 1 based
'''

def find_greatest_numbers(numbers: List[int]) -> str:

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

print(find_greatest_numbers([10, 29, 9, 47, 26]))