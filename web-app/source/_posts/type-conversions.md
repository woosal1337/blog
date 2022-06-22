---
title: type conversions
date: 2021-09-02 11:41:56
tags: py, python
---

# introduction

- as programmers, we are most likely aware that the programming is about `getting/fetching data`, `manipulating it`, and finally `returning` the format, which would like to be acquired. working with various and multiple data types might get us frustrated due to the Error examples, which are shown below

- `type conversions` help to resolve these kind of issues very easily, about which this article is about 

- p.s the `input()` function in python gets all the input does not matter what in `string` format. so, if you are looking to get `integer`, `float`, or other type of data from the user, you might be required to manipulate it by one of the according `type conversion`s

# errors

```python
>>> print(1 + "1")

print(1 + "1")
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

- as logical as it is, doing any mathematical operation on different kind of data types does not really make sense. by using `type conversion`s it is easy to solve these, let's show a couple of more example before moving to the `usage` part of them

```python
>>> user_age = input("Please enter your age: ")
>>> print("So, you were born in the year of ", 2021 - user_age)

print("So, you were born in the year of ", 2021 - user_age)
TypeError: unsupported operand type(s) for -: 'int' and 'str'
```

- `type()` is a special python built-in function, which helps you to identifythe type of t a declared variable and to which class it actually belongs to

```python
>>> print(type("So, you were born in the year of "))
>>> print(type(2021))

<class 'str'>
<class 'int'>
```

```python
>>> number1 = input("Enter number 1: ")
>>> number2 = input("Enter number 2: ")
>>> print(number1, "+", number2, "=", number1 + number2)

> 11
> 22

11 + 22 = 1122 # wut?
```

- the same case for all of them, let's see how to resolve it

# usage

### `int()`

- p.s `type conversion` functions are supposed to be assigned to the value after usage, else, they do not replace the value of the assigned variable instantly, a.k.a `inplace=False`
- the function that converts the string type of integers to the integer type of integers. frustrated? no worries, check the examples below

```python
>>> usr_inp = input("Enter your age: ")
> Enter your age: 19
print(type(usr_inp))

<class 'str'>

>>> usr_inp = int(usr_inp) # converting the string type to int
>>> print(type(usr_input))

<class 'int'>
```

- as was shown above, you can directly change the value of declared string as simple as that. however, how far can `int()` help you?

```python
>>> usr_inp = input("Enter your age: ")
> Enter your age: ihasidhas
>>> usr_inp = int(usr_inp)
>>> print(type(usr_inp))

usr_inp = int(usr_inp)
ValueError: invalid literal for int() with base 10: 'ihasidhas'
```

### `str()`

- what was done in the `int()` section, where a `str` type of data was converted to `int`, the exact same operation can be done vice versa.

```python
>>> a = 1337
>>> print(type(a))

class <'int'>

>>> a = str(a)
>>> print(a)

class <'str'>
```

```python
>>> a = 1337
>>> print(len(a))

print(len(a))
TypeError: object of type 'int' has no len()
```

- as was noticed above, `int` type of data can not have a `len` a.k.a length, however, `str` type of data can. so, we can just convert the `int` to string and find the length

```python
>>> a = 1337
>>> a = str(a)
>>> print(len(a))

4
```


### float()

- nothing different than the 2 mentioned and described above, besides, as the name suggests, `float()` converts the values into a `float` type of data :)

```python
>>> a = "3.0"
>>> print(type(a))

<class 'str'>

>>> a = float(a)
>>> print(type(a))

<class 'float'>
```

```python
>>> a = 3
>>> print(type(a))

<class 'int'>

>>> a = float(a)
>>> print(type(a))

<class 'float'>
```

- yes! you can also convert `integer`s to `float` values, not just the `string`s!

### `complex()`

- you probably have never seen this function before as long as you have messed with complex values in python
- feel free to learn about [complex numbers](https://en.wikipedia.org/wiki/Complex_number) by [clicking here](https://en.wikipedia.org/wiki/Complex_number)

```python
>>> a = 13 + 37j
>>> print(type(a))

<class 'complex'>
```

```python
>>> a = 13 + 37j
>>> b = 12 + 12j
>>> c = a + b
>>> print(c, type(c))

(25+49j) <class 'complex'>
```

- if you are not knew to the topic of `complex numbers` or have read the wikipedia article above, then the mathematical operations should completely make sense. but can we also use `complex()` for the conversions? :))

```python
>>> a = 1337
>>> b = complex(a)
>>> print(b, type(b))

(1337+0j) <class 'complex'>
```

- simple as that! as long as your variable does not have any imaginary part, `complex()` is going to assign it as `0` by default

# interesting stuff

- is `3.0` equal to `3` that to `3+0j`? :))

```python
>>> print(3 == 3.0)
>>> print(3 == 3.00000000)
>>> print(type(3), type(3.0))
>>> print(3 == float(3) == complex(3))

True
True
<class 'int'> <class 'float'>
True
```

- yes, if you are converting the same integer to other types, they all are going to be the same in value for python :)
