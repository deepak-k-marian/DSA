# Math, Libraries & Code Templates

> **Topics covered:** Python math utilities, standard library tools, reusable code templates for DSA

---

## Python Math Utilities

### Built-ins

```python
abs(-5)          # 5 — absolute value
pow(2, 10)       # 1024 — power
round(3.567, 2)  # 3.57 — round to 2 decimal places
divmod(17, 5)    # (3, 2) — quotient and remainder
```

### `math` Module

```python
import math

math.floor(3.7)    # 3 — round down
math.ceil(3.2)     # 4 — round up
math.sqrt(16)      # 4.0 — square root
math.log(8, 2)     # 3.0 — log base 2
math.log10(1000)   # 3.0
math.factorial(5)  # 120
math.gcd(12, 8)    # 4
math.lcm(4, 6)     # 12  (Python 3.9+)
math.inf           # positive infinity
```

### Integer Tricks

```python
7 // 2             # 3   — floor division
7 % 3              # 1   — modulo
(a + b - 1) // b  # ceiling division without math.ceil
n % 2 == 0         # True if even
len(str(n))        # digit count
sum(int(d) for d in str(n))  # sum of digits
```

---

## ASCII & Character Math

```python
ord('a')                # 97
ord('A')                # 65
chr(97)                 # 'a'
ord(ch) - ord('a')      # 0-indexed position of letter (a=0, b=1, ...)

ch.isalpha()            # True if letter
ch.isdigit()            # True if digit
ch.isalnum()            # True if letter or digit
'a'.upper()             # 'A'
'A'.lower()             # 'a'
```

---

## Python Standard Library for DSA

### `collections`

```python
from collections import Counter, defaultdict, deque

Counter("hello")           # {'l': 2, 'h': 1, 'e': 1, 'o': 1}

dd = defaultdict(int)      # missing key defaults to 0
dd = defaultdict(list)     # missing key defaults to []

dq = deque()
dq.append(1)               # add to right   — O(1)
dq.appendleft(0)           # add to left    — O(1)
dq.pop()                   # remove right   — O(1)
dq.popleft()               # remove left    — O(1)
```

### `heapq` — Min-Heap (Priority Queue)

```python
import heapq

heap = []
heapq.heappush(heap, val)       # insert
heapq.heappop(heap)             # remove & return min
heapq.heapify(lst)              # build heap in O(n)
heapq.nlargest(k, iterable)     # k largest elements
heapq.nsmallest(k, iterable)    # k smallest elements

# Max-heap: negate values
heapq.heappush(heap, -val)
max_val = -heapq.heappop(heap)
```

### `bisect` — Binary Search on Sorted Lists

```python
import bisect

bisect.bisect_left(arr, x)    # index of first position >= x
bisect.bisect_right(arr, x)   # index of first position > x
bisect.insort(arr, x)         # insert x keeping list sorted
```

### `functools`

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n - 1) + fib(n - 2)
```

---

## Reusable Code Templates

### Sorting

```python
nums.sort()                              # in-place ascending
nums.sort(reverse=True)                  # descending
nums.sort(key=lambda x: x[1])           # by second element
nums.sort(key=lambda x: (-x[1], x[0]))  # multi-key sort
sorted_copy = sorted(nums)               # returns new list
```

### Binary Search

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

### Prefix Sum

```python
def build_prefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i, n in enumerate(nums):
        prefix[i + 1] = prefix[i] + n
    return prefix

# Range sum [l, r] inclusive, 0-indexed
def range_sum(prefix, l, r):
    return prefix[r + 1] - prefix[l]
```

### List Comprehensions

```python
squares  = [x**2 for x in range(10)]
evens    = [x for x in nums if x % 2 == 0]
matrix   = [[0] * cols for _ in range(rows)]  # 2D array
flat     = [x for row in matrix for x in row]  # flatten
```

### Matrix Traversal

```python
rows, cols = len(grid), len(grid[0])
directions = [(0,1),(0,-1),(1,0),(-1,0)]  # 4-directional

for dr, dc in directions:
    nr, nc = r + dr, c + dc
    if 0 <= nr < rows and 0 <= nc < cols:
        # process grid[nr][nc]
        pass
```

---

## Complexity Cheat Sheet

| Operation              | Time          |
|------------------------|---------------|
| `sorted()` / `.sort()`| $O(n \log n)$ |
| Binary search          | $O(\log n)$   |
| Heap push/pop          | $O(\log n)$   |
| Heap build (heapify)   | $O(n)$        |
| `bisect_left/right`    | $O(\log n)$   |
| `Counter(iterable)`    | $O(n)$        |
| `deque` append/pop     | $O(1)$        |
