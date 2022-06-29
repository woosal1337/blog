---
title: eval() == evil()
date: 2021-09-03 17:13:49
tags: py
---

# evil() functions of python: `eval()` & `exec()`

# Introduction

- If you have never used these functions before, you will understand in a bit why I call it as `evil` functions.

```python
>>> eval("print(5 + 10)")

15
```

- Is not python amazing?

```python
>>> a = 5
>>> print(eval("a ** 2"))

25
```

- What is even interesting is actually with `exec()` is that, it gives you
even superior permission.

```python
>>> exec("a = 5")
>>> eval("print(a ** 2)")

25
```

- It gives you complete python control right within a function. As superior as
it is, personally, I would almost never recommend you to use it. 
p.s not everybody around us is well-intentioned

```python
>>> exec("import os;print(next(os.walk('./'), (None, None, []))[2])")

.. main.py
```

- The code snippet above literally prints out every file in the specified folder
an experienced python developer can easily delete, manipulate, modify, create 
and more that I can not think of right now if you do give such an access to a
user. It is kind of replicating an `ssh`

- Then how and when do we use these evil functions?
    - You have no other way to use but this function in your program (almost 
    impossible)
    - You do put a very advanced filtering on the user input before actually
    forwarding it to one of these functions (especially `exec()`)
    - p.s these functions are actually slower in speed in most scenarios than
    the functions, which can easily replace them


```python
>>> exec("def f(x):return x")
>>> eval("print(f(1337))")

1337
```

- Need even more spacing for your code within `exec()`? say no more

```python
>>> exec("""
    class Person():
        def __init__(self, name, age):
            self.name = name
            self.age = age

        def get_name(self):
            return self.name

        def get_age(self):
         return self.age

    me = Person('wosal', 1337);
""")

>>> eval("""
    print(me.get_name(), me.get_age())
    """)

woosal 1337
```

- Put anything in as long as you want! *that is what she said*
