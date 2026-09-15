def printAllPairs():
	try:
		numLength = int(input())
		arr = list(map(int, input().split()))
	except ValueError:
		return "Invalid Input Data type"
	for i in range(0,numLength):
		for j in arr[i+1:]:
			print(f"({arr[i]},{j})")
printAllPairs()
