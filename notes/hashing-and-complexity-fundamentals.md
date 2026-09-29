# Hashing & Complexity Fundamentals

> **Topics covered:** Array Patterns, Hashing, Time & Space Complexity

---

## Hashing

Hashing is the process of mapping data of arbitrary size to fixed-size values using a **hash function**. It enables fast data lookup, insertion, and deletion — typically in $O(1)$ average time.

| Structure  | What it stores     | Key operation         |
|------------|--------------------|-----------------------|
| Hash Map   | Key → Value pairs  | `d[key] = value`      |
| Hash Set   | Unique values only | `s.add(x)`, `x in s` |

---

## Hash Map

A **hash map** (dictionary) stores key-value pairs and uses hashing to compute the index for storage.

```python
d = {}
d[key] = value          # insert / update
d.get(key, default)     # safe lookup — returns default if missing
key in d                # membership check — O(1)
del d[key]              # delete a key
```

---

## Hash Set

A **hash set** stores only unique values. Useful for deduplication and fast membership checks.

```python
s = set()
s.add(x)        # insert
x in s          # O(1) lookup
s.discard(x)    # remove without error if missing
s.remove(x)     # remove — raises KeyError if missing
```

---

## Frequency Counting

One of the most common uses of a hash map is counting how often each element appears.

```python
from collections import defaultdict, Counter

# Using defaultdict
freq = defaultdict(int)
for n in nums:
    freq[n] += 1

# Using Counter (concise)
freq = Counter(nums)
freq.most_common(k)   # top k frequent elements
```

---

## Complexity of Hashing

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Insert    | $O(1)$      | $O(n)$     |
| Lookup    | $O(1)$      | $O(n)$     |
| Delete    | $O(1)$      | $O(n)$     |

> Worst case occurs due to **hash collisions**. Python's dict handles them internally.

---

## Big-O Complexity Review

| Complexity    | Name         | Example Use Case           |
|---------------|--------------|----------------------------|
| $O(1)$        | Constant     | Hash map lookup            |
| $O(\log n)$   | Logarithmic  | Binary search              |
| $O(n)$        | Linear       | Single loop over array     |
| $O(n \log n)$ | Linearithmic | Merge sort, Heap sort      |
| $O(n^2)$      | Quadratic    | Nested loops               |
| $O(2^n)$      | Exponential  | Brute-force subsets        |

### Fibonacci — Complexity Comparison

| Approach      | Time       | Space  |
|---------------|------------|--------|
| Recursive     | $O(2^n)$   | $O(n)$ |
| Memoized (DP) | $O(n)$     | $O(n)$ |
| Iterative     | $O(n)$     | $O(1)$ |

---

## Complexity Summary

| Technique           | Time   | Space  |
|---------------------|--------|--------|
| Hash map operations | $O(1)$ | $O(n)$ |
| Hash set operations | $O(1)$ | $O(n)$ |
| Frequency count     | $O(n)$ | $O(n)$ |

> Always account for the $O(n)$ **space overhead** when using a hash map or set.

---

## LeetCode Problems

| # | Problem | Concept |
|---|---------|---------|
| 217 | Contains Duplicate | Hash set membership |
| 1748 | Sum of Unique Elements | Frequency map |
| 1 | Two Sum | Hash map for complement lookup |
