# User Input Parsing & String Processing

> **Topics covered:** Input/Output format, parsing techniques, string manipulation, output formatting

---

## Reading Input in Python

### Single Value

```python
n = int(input())          # integer
x = float(input())        # float
s = input().strip()       # string — strip removes edge whitespace
```

### Multiple Values on One Line

```python
a, b = map(int, input().split())        # two integers
nums = list(map(int, input().split()))  # list of integers
words = input().split()                 # list of strings
```

### Multiple Lines of Input

```python
n = int(input())
lines = [input().strip() for _ in range(n)]

# Read until EOF (competitive programming)
import sys
data = sys.stdin.read().split()
```

### Grid / Matrix Input

```python
rows, cols = map(int, input().split())
grid = [list(map(int, input().split())) for _ in range(rows)]
```

---

## Output Formatting

### Basic Print

```python
print(a, b, c)              # space-separated by default
print(a, b, c, sep=', ')    # custom separator
print("Value:", x, end='')  # no trailing newline
```

### Formatted Output

```python
score = 95.678
print(f"{score:.2f}")           # f-string — 2 decimal places
print("Score: {:.2f}".format(score))
print(round(score, 2))          # round to 2 decimal places
print("Yes" if condition else "No")
```

---

## String Processing

### Basics & Slicing

```python
s = "Hello, World!"
len(s)          # 13
s[0]            # 'H'
s[-1]           # '!'
s[1:5]          # 'ello'
s[::-1]         # reverse the string
s.lower()       # 'hello, world!'
s.upper()       # 'HELLO, WORLD!'
s.strip()       # remove leading/trailing whitespace
```

### Search & Check

```python
s.startswith("He")   # True
s.endswith("!")      # True
s.find("World")      # 7 — index, or -1 if not found
"World" in s         # True
s.count("l")         # 3
```

### Modify & Build

```python
s.replace("Hello", "Hi")       # "Hi, World!"
s.split(", ")                  # ["Hello", "World!"]
", ".join(["Hello", "World"])  # "Hello, World"
```

### Character Classification

```python
ch.isalpha()    # True if letter
ch.isdigit()    # True if digit
ch.isalnum()    # True if letter or digit
ch.isspace()    # True if whitespace
ch.isupper()    # True if uppercase
ch.islower()    # True if lowercase
```

### String as List (Mutable)

```python
chars = list(s)       # convert to mutable list
chars[0] = 'H'
result = ''.join(chars)   # convert back to string

# Frequency of characters
from collections import Counter
freq = Counter(s)
```

---

## Input Parsing Patterns

### N Test Cases

```python
t = int(input())
for _ in range(t):
    n = int(input())
    nums = list(map(int, input().split()))
```

### Attendance / Binary Input

```python
# 0 = absent, 1 = present
attendance = list(map(int, input().split()))
present_count = sum(attendance)
```

### Float with Precision Output

```python
x = float(input())
print(f"{x:.2f}")
```

---

## Common Parsing Gotchas

| Issue | Fix |
|-------|-----|
| Extra whitespace in input | Use `.strip()` |
| Input as string, need int | `int(input())` |
| Multiple integers in one line | `map(int, input().split())` |
| Large input (TLE risk) | Use `sys.stdin.read()` |

```python
# Fast input for large data
import sys
input = sys.stdin.readline
```

---

## Operator Precedence (Quick Reference)

| Priority | Operators |
|----------|-----------|
| Highest  | `()` parentheses |
| ↓        | `**` exponentiation |
| ↓        | `+x` `-x` `~x` unary |
| ↓        | `*` `/` `//` `%` |
| ↓        | `+` `-` |
| ↓        | `<<` `>>` bit shift |
| ↓        | `&` `^` `\|` bitwise |
| ↓        | `==` `!=` `<` `>` `<=` `>=` `in` `is` |
| ↓        | `not` |
| ↓        | `and` |
| Lowest   | `or` |
