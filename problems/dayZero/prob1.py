'''
Queston:
In an array of elements, find the average of odd elements and average of even elements.

Constrains:
- No. of Iterations obtained in runtime
- Array of elements
- Size of array not listed
- Round off the value to two decimal places 

I/P:
3
10 2 19 27 16
3 9 5 15
12 46 20 14 26

O/P:
T1
Even Average: 9.33
Odd Average: 16.33

T2
Eve Avg: 0.00
Odd Avg: 8

T3
Eve Avg: 23.60
Odd Avg: 0.00
'''

def avgOfOddAndEven():
    noOfArray = int(input("Enter no. of arrays / test cases : "))
    print("")

    if noOfArray <= 0: print("No. of arrays should be greater than 0."); return
    
    for i in range(noOfArray):
        arrayEleInput = map(int, input(f"Enter the elements of array {i+1} : ").split())
        
        oddEleSum = oddEleCount = evenEleSum = evenEleCount = 0
        
        for x in arrayEleInput:
            if x % 2 == 0:
                evenEleSum += x
                evenEleCount += 1
            else:
                oddEleSum += x
                oddEleCount += 1
        
        avg_even = round(evenEleSum / evenEleCount, 2) if evenEleCount > 0 else 0.0
        avg_odd = round(oddEleSum / oddEleCount, 2) if oddEleCount > 0 else 0.0
        
        print(f"T{i+1}")
        print(f"Average of even numbers in array {i+1} : {avg_even:.2f}")
        print(f"Average of  odd numbers in array {i+1} : {avg_odd:.2f} \n")

avgOfOddAndEven()
