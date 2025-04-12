import { Code, Bug, Repeat, Zap, Layers, GitBranch, Database } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface PracticeProblem {
  id: number
  title: string
  category: "algorithms" | "loops" | "recursion" | "debugging" | "dataStructures" | "optimization"
  difficulty: "easy" | "medium" | "hard"
  description: string
  solvedBy: number
  icon: LucideIcon
  problemStatement: string
  examples: Array<{
    input: string
    output: string
  }>
  constraints: string[]
  starterCode: {
    javascript: string
    python: string
    cpp: string
  }
  testCases: Array<{
    input: any
    output: any
    explanation?: string
  }>
  solution: {
    javascript: string
    python: string
    cpp: string
  }
  hints: string[]
  timeComplexity: string
  spaceComplexity: string
  tags: string[]
}

export const practiceProblems: PracticeProblem[] = [
  {
    id: 1,
    title: "Array Reversal",
    category: "algorithms",
    difficulty: "easy",
    description: "Implement a function to reverse an array without using built-in methods.",
    solvedBy: 324,
    icon: Code,
    problemStatement:
      "Write a function `reverseArray` that takes an array of integers as input and returns a new array with the elements in reverse order. You cannot use built-in methods like `reverse()`, `map()`, or `reduce()`.",
    examples: [
      {
        input: "[1, 2, 3, 4, 5]",
        output: "[5, 4, 3, 2, 1]",
      },
      {
        input: "[9, 8]",
        output: "[8, 9]",
      },
    ],
    constraints: [
      "The array length will be between 1 and 1000",
      "Array elements will be integers between -1000 and 1000",
    ],
    starterCode: {
      javascript: `function reverseArray(arr) {
  // Your code here
  
  return arr;
}

// Example usage
console.log(reverseArray([1, 2, 3, 4, 5]));`,
      python: `def reverse_array(arr):
    # Your code here
    
    return arr

# Example usage
print(reverse_array([1, 2, 3, 4, 5]))`,
      cpp: `#include <vector>
#include <iostream>

std::vector<int> reverseArray(std::vector<int> arr) {
    // Your code here
    
    return arr;
}

// Example usage in main() function
// int main() {
//     std::vector<int> result = reverseArray({1, 2, 3, 4, 5});
//     for (int num : result) {
//         std::cout << num << " ";
//     }
//     return 0;
// }`,
    },
    testCases: [
      {
        input: [1, 2, 3, 4, 5],
        output: [5, 4, 3, 2, 1],
      },
      {
        input: [9, 8],
        output: [8, 9],
      },
      {
        input: [42],
        output: [42],
      },
    ],
    solution: {
      javascript: `function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}`,
      python: `def reverse_array(arr):
    result = []
    for i in range(len(arr) - 1, -1, -1):
        result.append(arr[i])
    return result`,
      cpp: `std::vector<int> reverseArray(std::vector<int> arr) {
    std::vector<int> result;
    for (int i = arr.size() - 1; i >= 0; i--) {
        result.push_back(arr[i]);
    }
    return result;
}`,
    },
    hints: [
      "Try using a for loop that starts from the end of the array",
      "Create a new array to store the reversed elements",
      "You can also solve this in-place by swapping elements",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["arrays", "loops", "basic"],
  },
  {
    id: 2,
    title: "Fix the Loop",
    category: "debugging",
    difficulty: "easy",
    description: "Debug an infinite loop in a for-loop implementation.",
    solvedBy: 287,
    icon: Bug,
    problemStatement:
      "The following code is supposed to print numbers from 1 to n, but it's stuck in an infinite loop. Find and fix the bug.",
    examples: [
      {
        input: "n = 5",
        output: "1 2 3 4 5",
      },
    ],
    constraints: ["1 <= n <= 100"],
    starterCode: {
      javascript: `function printNumbers(n) {
  for (let i = 1; i <= n; i--) { // Bug is here
    console.log(i);
  }
}

// Example usage
printNumbers(5);`,
      python: `def print_numbers(n):
    i = 1
    while i <= n:
        print(i, end=" ")
        i -= 1  # Bug is here

# Example usage
print_numbers(5)`,
      cpp: `#include <iostream>

void printNumbers(int n) {
    for (int i = 1; i <= n; i--) { // Bug is here
        std::cout << i << " ";
    }
}

// Example usage in main() function
// int main() {
//     printNumbers(5);
//     return 0;
// }`,
    },
    testCases: [
      {
        input: 5,
        output: "1 2 3 4 5",
      },
      {
        input: 3,
        output: "1 2 3",
      },
    ],
    solution: {
      javascript: `function printNumbers(n) {
  for (let i = 1; i <= n; i++) { // Fixed: i++ instead of i--
    console.log(i);
  }
}`,
      python: `def print_numbers(n):
    i = 1
    while i <= n:
        print(i, end=" ")
        i += 1  # Fixed: i += 1 instead of i -= 1`,
      cpp: `void printNumbers(int n) {
    for (int i = 1; i <= n; i++) { // Fixed: i++ instead of i--
        std::cout << i << " ";
    }
}`,
    },
    hints: [
      "Look carefully at how the loop variable is being updated",
      "For a loop to terminate, the condition must eventually become false",
      "The loop variable should be moving towards the termination condition",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["debugging", "loops", "basic"],
  },
  {
    id: 3,
    title: "Fibonacci Sequence",
    category: "recursion",
    difficulty: "medium",
    description: "Implement a recursive function to generate the nth Fibonacci number.",
    solvedBy: 215,
    icon: Repeat,
    problemStatement:
      "Write a recursive function to calculate the nth Fibonacci number. The Fibonacci sequence is defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n > 1.",
    examples: [
      {
        input: "n = 5",
        output: "5",
      },
      {
        input: "n = 10",
        output: "55",
      },
    ],
    constraints: ["0 <= n <= 30"],
    starterCode: {
      javascript: `function fibonacci(n) {
  // Your recursive solution here
}

// Example usage
console.log(fibonacci(5)); // Should output 5`,
      python: `def fibonacci(n):
    # Your recursive solution here
    pass

# Example usage
print(fibonacci(5))  # Should output 5`,
      cpp: `int fibonacci(int n) {
    // Your recursive solution here
}

// Example usage in main() function
// int main() {
//     std::cout << fibonacci(5) << std::endl;  // Should output 5
//     return 0;
// }`,
    },
    testCases: [
      {
        input: 0,
        output: 0,
      },
      {
        input: 1,
        output: 1,
      },
      {
        input: 5,
        output: 5,
      },
      {
        input: 10,
        output: 55,
      },
    ],
    solution: {
      javascript: `function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      python: `def fibonacci(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)`,
      cpp: `int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
    },
    hints: [
      "Define your base cases first (n=0 and n=1)",
      "For n > 1, the Fibonacci number is the sum of the two previous Fibonacci numbers",
      "Consider using memoization to optimize the solution",
    ],
    timeComplexity: "O(2^n) for naive recursion, O(n) with memoization",
    spaceComplexity: "O(n)",
    tags: ["recursion", "dynamic programming", "mathematics"],
  },
  {
    id: 4,
    title: "Optimize the Algorithm",
    category: "optimization",
    difficulty: "hard",
    description: "Improve the time complexity of a sorting algorithm.",
    solvedBy: 142,
    icon: Zap,
    problemStatement:
      "The following code implements bubble sort to sort an array. Optimize it to achieve better time complexity.",
    examples: [
      {
        input: "[5, 3, 8, 4, 2]",
        output: "[2, 3, 4, 5, 8]",
      },
    ],
    constraints: [
      "The array length will be between 1 and 10,000",
      "Array elements will be integers between -10,000 and 10,000",
    ],
    starterCode: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Example usage
console.log(bubbleSort([5, 3, 8, 4, 2]));`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
print(bubble_sort([5, 3, 8, 4, 2]))`,
      cpp: `#include <vector>

std::vector<int> bubbleSort(std::vector<int> arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}`,
    },
    testCases: [
      {
        input: [5, 3, 8, 4, 2],
        output: [2, 3, 4, 5, 8],
      },
      {
        input: [1, 2, 3, 4, 5],
        output: [1, 2, 3, 4, 5],
      },
      {
        input: [5, 4, 3, 2, 1],
        output: [1, 2, 3, 4, 5],
      },
    ],
    solution: {
      javascript: `function optimizedSort(arr) {
  return arr.sort((a, b) => a - b);
}

// Alternative implementation (quicksort)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
      python: `def optimized_sort(arr):
    return sorted(arr)

# Alternative implementation (quicksort)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
      cpp: `#include <algorithm>
#include <vector>

std::vector<int> optimizedSort(std::vector<int> arr) {
    std::sort(arr.begin(), arr.end());
    return arr;
}`,
    },
    hints: [
      "Consider using a more efficient sorting algorithm like quicksort or mergesort",
      "You can also use the built-in sorting functions in your language",
      "Even for bubble sort, you can optimize by stopping early if no swaps are made in a pass",
    ],
    timeComplexity: "O(n log n) for optimized solution vs O(n²) for bubble sort",
    spaceComplexity: "O(n) for most efficient implementations",
    tags: ["sorting", "optimization", "algorithms"],
  },
  {
    id: 5,
    title: "Loop Through Matrix",
    category: "loops",
    difficulty: "medium",
    description: "Implement nested loops to traverse a 2D matrix in spiral order.",
    solvedBy: 198,
    icon: Layers,
    problemStatement:
      "Given an m x n matrix, return all elements of the matrix in spiral order (clockwise, starting from the top-left element).",
    examples: [
      {
        input: "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
      },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  // Your code here
}

// Example usage
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));`,
      python: `def spiral_order(matrix):
    # Your code here
    pass

# Example usage
print(spiral_order([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))`,
      cpp: `#include <vector>

std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
    // Your code here
    std::vector<int> result;
    return result;
}`,
    },
    testCases: [
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        output: [1, 2, 3, 6, 9, 8, 7, 4, 5],
      },
      {
        input: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
        ],
        output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
      },
    ],
    solution: {
      javascript: `function spiralOrder(matrix) {
  if (!matrix.length) return [];
  
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    // Traverse right
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;
    
    // Traverse down
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;
    
    if (top <= bottom) {
      // Traverse left
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }
    
    if (left <= right) {
      // Traverse up
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }
  
  return result;
}`,
      python: `def spiral_order(matrix):
    if not matrix:
        return []
    
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # Traverse right
        for i in range(left, right + 1):
            result.append(matrix[top][i])
        top += 1
        
        # Traverse down
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        
        if top <= bottom:
            # Traverse left
            for i in range(right, left - 1, -1):
                result.append(matrix[bottom][i])
            bottom -= 1
        
        if left <= right:
            # Traverse up
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
    
    return result`,
      cpp: `std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
    std::vector<int> result;
    if (matrix.empty()) return result;
    
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse right
        for (int i = left; i <= right; i++) {
            result.push_back(matrix[top][i]);
        }
        top++;
        
        // Traverse down
        for (int i = top; i <= bottom; i++) {
            result.push_back(matrix[i][right]);
        }
        right--;
        
        if (top <= bottom) {
            // Traverse left
            for (int i = right; i >= left; i--) {
                result.push_back(matrix[bottom][i]);
            }
            bottom--;
        }
        
        if (left <= right) {
            // Traverse up
            for (int i = bottom; i >= top; i--) {
                result.push_back(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}`,
    },
    hints: [
      "Define four boundaries: top, bottom, left, and right",
      "Traverse the matrix in a spiral pattern by moving along these boundaries",
      "After traversing each direction, update the corresponding boundary",
    ],
    timeComplexity: "O(m*n) where m is the number of rows and n is the number of columns",
    spaceComplexity: "O(1) excluding the output array",
    tags: ["matrix", "loops", "arrays"],
  },
  {
    id: 6,
    title: "Debug Recursion",
    category: "debugging",
    difficulty: "hard",
    description: "Fix a recursive function that's causing a stack overflow.",
    solvedBy: 156,
    icon: Bug,
    problemStatement:
      "The following recursive function is supposed to calculate the sum of numbers from 1 to n, but it's causing a stack overflow. Find and fix the bug.",
    examples: [
      {
        input: "n = 5",
        output: "15",
      },
    ],
    constraints: ["1 <= n <= 10,000"],
    starterCode: {
      javascript: `function sumToN(n) {
  return n + sumToN(n - 1); // Missing base case
}

// Example usage
console.log(sumToN(5)); // Should output 15`,
      python: `def sum_to_n(n):
    return n + sum_to_n(n - 1)  # Missing base case

# Example usage
print(sum_to_n(5))  # Should output 15`,
      cpp: `int sumToN(int n) {
    return n + sumToN(n - 1);  // Missing base case
}

// Example usage in main() function
// int main() {
//     std::cout << sumToN(5) << std::endl;  // Should output 15
//     return 0;
// }`,
    },
    testCases: [
      {
        input: 1,
        output: 1,
      },
      {
        input: 5,
        output: 15,
      },
      {
        input: 10,
        output: 55,
      },
    ],
    solution: {
      javascript: `function sumToN(n) {
  if (n <= 1) return n; // Added base case
  return n + sumToN(n - 1);
}`,
      python: `def sum_to_n(n):
    if n <= 1:  # Added base case
        return n
    return n + sum_to_n(n - 1)`,
      cpp: `int sumToN(int n) {
    if (n <= 1) return n;  // Added base case
    return n + sumToN(n - 1);
}`,
    },
    hints: [
      "Every recursive function needs a base case to stop the recursion",
      "Think about the simplest input for which you know the answer immediately",
      "For summing numbers, what's the sum of numbers from 1 to 1?",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) due to the recursion stack",
    tags: ["recursion", "debugging", "stack overflow"],
  },
  {
    id: 7,
    title: "Binary Search Implementation",
    category: "algorithms",
    difficulty: "medium",
    description: "Implement binary search to efficiently find an element in a sorted array.",
    solvedBy: 230,
    icon: GitBranch,
    problemStatement:
      "Write a function that implements binary search to find the index of a target element in a sorted array. If the target is not found, return -1.",
    examples: [
      {
        input: "arr = [1, 3, 5, 7, 9], target = 5",
        output: "2",
      },
      {
        input: "arr = [1, 3, 5, 7, 9], target = 6",
        output: "-1",
      },
    ],
    constraints: [
      "1 <= arr.length <= 10,000",
      "All elements in the array are unique",
      "The array is sorted in ascending order",
    ],
    starterCode: {
      javascript: `function binarySearch(arr, target) {
  // Your code here
}

// Example usage
console.log(binarySearch([1, 3, 5, 7, 9], 5)); // Should output 2`,
      python: `def binary_search(arr, target):
    # Your code here
    pass

# Example usage
print(binary_search([1, 3, 5, 7, 9], 5))  # Should output 2`,
      cpp: `int binarySearch(std::vector<int>& arr, int target) {
    // Your code here
    return -1;
}

// Example usage in main() function
// int main() {
//     std::vector<int> arr = {1, 3, 5, 7, 9};
//     std::cout << binarySearch(arr, 5) << std::endl;  // Should output 2
//     return 0;
// }`,
    },
    testCases: [
      {
        input: {
          arr: [1, 3, 5, 7, 9],
          target: 5,
        },
        output: 2,
      },
      {
        input: {
          arr: [1, 3, 5, 7, 9],
          target: 6,
        },
        output: -1,
      },
      {
        input: {
          arr: [1, 3, 5, 7, 9],
          target: 1,
        },
        output: 0,
      },
    ],
    solution: {
      javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
      cpp: `int binarySearch(std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
    },
    hints: [
      "Start with two pointers: left at the beginning and right at the end of the array",
      "In each step, compare the middle element with the target",
      "If the middle element is the target, return its index",
      "If the middle element is less than the target, search the right half",
      "If the middle element is greater than the target, search the left half",
    ],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    tags: ["binary search", "arrays", "searching"],
  },
  {
    id: 8,
    title: "Implement a Queue using Stacks",
    category: "dataStructures",
    difficulty: "hard",
    description: "Implement a queue data structure using only stacks.",
    solvedBy: 175,
    icon: Database,
    problemStatement:
      "Implement a queue using only stack data structures. The queue should support standard operations: enqueue (push), dequeue (pop), peek, and isEmpty.",
    examples: [
      {
        input: "enqueue(1), enqueue(2), dequeue(), enqueue(3), dequeue(), peek()",
        output: "1, 2, 3",
      },
    ],
    constraints: [
      "You may only use standard stack operations: push, pop, peek, isEmpty",
      "All operations should be valid (you can assume dequeue and peek won't be called on an empty queue)",
    ],
    starterCode: {
      javascript: `class QueueUsingStacks {
  constructor() {
    // Initialize your data structure here
  }
  
  // Add element to the queue
  enqueue(x) {
    // Your code here
  }
  
  // Remove element from the queue and return it
  dequeue() {
    // Your code here
  }
  
  // Get the front element
  peek() {
    // Your code here
  }
  
  // Return whether the queue is empty
  isEmpty() {
    // Your code here
  }
}

// Example usage
const queue = new QueueUsingStacks();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue());  // Should output 1
queue.enqueue(3);
console.log(queue.dequeue());  // Should output 2
console.log(queue.peek());     // Should output 3`,
      python: `class QueueUsingStacks:
    def __init__(self):
        # Initialize your data structure here
        pass
    
    # Add element to the queue
    def enqueue(self, x):
        # Your code here
        pass
    
    # Remove element from the queue and return it
    def dequeue(self):
        # Your code here
        pass
    
    # Get the front element
    def peek(self):
        # Your code here
        pass
    
    # Return whether the queue is empty
    def is_empty(self):
        # Your code here
        pass

# Example usage
queue = QueueUsingStacks()
queue.enqueue(1)
queue.enqueue(2)
print(queue.dequeue())  # Should output 1
queue.enqueue(3)
print(queue.dequeue())  # Should output 2
print(queue.peek())     # Should output 3`,
      cpp: `#include <stack>

class QueueUsingStacks {
private:
    // Your data members here

public:
    QueueUsingStacks() {
        // Initialize your data structure here
    }
    
    // Add element to the queue
    void enqueue(int x) {
        // Your code here
    }
    
    // Remove element from the queue and return it
    int dequeue() {
        // Your code here
        return 0;
    }
    
    // Get the front element
    int peek() {
        // Your code here
        return 0;
    }
    
    // Return whether the queue is empty
    bool isEmpty() {
        // Your code here
        return true;
    }
};

// Example usage in main() function
// int main() {
//     QueueUsingStacks queue;
//     queue.enqueue(1);
//     queue.enqueue(2);
//     std::cout << queue.dequeue() << std::endl;  // Should output 1
//     queue.enqueue(3);
//     std::cout << queue.dequeue() << std::endl;  // Should output 2
//     std::cout << queue.peek() << std::endl;     // Should output 3
//     return 0;
// }`,
    },
    testCases: [
      {
        input: ["enqueue(1)", "enqueue(2)", "dequeue()", "enqueue(3)", "dequeue()", "peek()"],
        output: [null, null, 1, null, 2, 3],
      },
    ],
    solution: {
      javascript: `class QueueUsingStacks {
  constructor() {
    this.stack1 = []; // for enqueue
    this.stack2 = []; // for dequeue
  }
  
  enqueue(x) {
    this.stack1.push(x);
  }
  
  dequeue() {
    if (this.stack2.length === 0) {
      // Transfer all elements from stack1 to stack2
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }
  
  peek() {
    if (this.stack2.length === 0) {
      // Transfer all elements from stack1 to stack2
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  isEmpty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}`,
      python: `class QueueUsingStacks:
    def __init__(self):
        self.stack1 = []  # for enqueue
        self.stack2 = []  # for dequeue
    
    def enqueue(self, x):
        self.stack1.append(x)
    
    def dequeue(self):
        if not self.stack2:
            # Transfer all elements from stack1 to stack2
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2.pop()
    
    def peek(self):
        if not self.stack2:
            # Transfer all elements from stack1 to stack2
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1]
    
    def is_empty(self):
        return not self.stack1 and not self.stack2`,
      cpp: `#include <stack>

class QueueUsingStacks {
private:
    std::stack<int> stack1;  // for enqueue
    std::stack<int> stack2;  // for dequeue

public:
    QueueUsingStacks() {
    }
    
    void enqueue(int x) {
        stack1.push(x);
    }
    
    int dequeue() {
        if (stack2.empty()) {
            // Transfer all elements from stack1 to stack2
            while (!stack1.empty()) {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        int front = stack2.top();
        stack2.pop();
        return front;
    }
    
    int peek() {
        if (stack2.empty()) {
            // Transfer all elements from stack1 to stack2
            while (!stack1.empty()) {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        return stack2.top();
    }
    
    bool isEmpty() {
        return stack1.empty() && stack2.empty();
    }
};`,
    },
    hints: [
      "Use two stacks: one for enqueue operations and one for dequeue operations",
      "When dequeuing, if the dequeue stack is empty, transfer all elements from the enqueue stack",
      "This approach amortizes the cost of dequeue operations",
    ],
    timeComplexity: "O(1) amortized for all operations",
    spaceComplexity: "O(n)",
    tags: ["stacks", "queues", "data structures"],
  },
]
