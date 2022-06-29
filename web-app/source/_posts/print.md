---
title: print()
date: 2021-09-01 22:25:35
tags: python, py
---

# Introduction
## print() is not just print()

##### General usage of print()

- ###### Single quote
```python
>>> language = 'python'
>>> print(language)

python
```

- ###### Double quotes
```python
>>> language = "python"
>>> print(language)

python
```

- ###### Triple quotes
```python
>>> language = """python"""
>>> print(language)

python
```

# Errors
## prOfEsSIonAl SugGeStIoN: "python is ez, use c++ or c#"

```python
>>> print("Python is "eAzY" to code")

print("Python is "eAzY" to code")
                      ^
SyntaxError: invalid syntax
```

- What happened? As the first double quotes ends at the beginning of the 
eAzY, the rest of the sentence is not considered to be a part of the
print argument causing a SyntaxError. So, how to fix it?

```python
>>> print('Python is "eAzY" to code')

Python is "eAzY" to code
```

- As you might have already guessed from the syntax highlighting, this code
will not cause any issues if ran, the reason being the starting and the ending
quotation marks math each other, and single quotes covers the whole sentence.

```python
>>> print("today's weather is windy.")

today's weather is windy.
```

- No errors? Yes, the same reason as above. But, do we have any other ways to
solve this issue? Hell, yes!

```python
>>> print("""my name's woosal, and i hate people being rude on so"s main page""")

my name's woosal, and i hate people being rude on so"s main page
```

- Triple quotes are insane. Does not matter how many single or double quotes
you use within the triple quotes, they all are going to work as usual and not
give such stupid SyntaxErrors as above. Besides that, triple quotes do also
allow you to print/return any string values as they are one-to-one. What does 
this mean? Check the example below.

```python
>>> print("""
[w]=========woosal========[-][o][x]
|                                 |
|      Welcome my friend!         |
|       This is awesome!          |
|           1 3 3 7               |
|                                 |
|=================================|
""")

[w]=========woosal========[-][o][x]
|                                 |
|      Welcome my friend!         |
|       This is awesome!          |
|           1 3 3 7               |
|                                 |
|=================================|
```

- Is not that cool? Does not matter what or how you write between these triple 
quotes, they are going to be returned the same exact way as they have been 
written. Wanna give lorem ipsum a try with it?

```python
>>> print("""
Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut!
""")

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut!
```

- Yessirr! All the same as the input.

# Usage

##### Multiple arguments

```python
>>> print("python", "linux")

python linux
```

- So what? I did not combine them under one string as `python linux`, however, 
did get the same exact result as if I would? Yes, but why? Before explaining, 
let me show more examples regarding it.

```python
>>> print("python", "linux", "language", 1337)

python linux language 1337
```

- I would like to attract your attention to the input values within the print
statement. What is different besides being more in the number of inputted elements
from the statement above? Yes, the last element `1337` has the type of `int`
instead of `str`. And `print()` statement still manages to print all of them 
as a result.

##### Parameters of print() function
###### You might have always though that `print()` is just `print()`, which prints the stuff you want, and that is all, right? well...

### `sep`

- As almost all of the functions in python, `print()` function does also have
some parameters, one of which is being `sep`. what is `sep`?

```python
>>> print("Python", "PHP", "C++", "C", "Erlang")

Python PHP C++ C Erlang
```

- Have you ever noticed that `print()` function by default puts spaces between
the elements of the input? Well, that is the reason being that `sep` argument of `print()` function is set to `sep = " "` by default, meaning that each element in the `print()` statement is going to be separated by one `" "` space. As always, you can of course, change this parameter.

```python
>>> print("Python", "PHP", "C++", "C", "Erlang", sep=" ")

Python PHP C++ C Erlang
```

- The output is going to be exactly the same as above as the `sep` parameter was
set to the same value, which is `" "`.

```python
>>> print("U", "S", "A", sep=".")

U.S.A
```

- Here we go. The default space `" "` input was changed to `.`, so all of the
elements are going to be seperated by `.`s. Feel free to change this value to 
anything you want to see the output.

```python
>>> print(1,2,3,4,5, sep=0)

print(1,2,3,4,5, sep=0)
TypeError: sep must be None or a string, not int
```

- As the error clearly explains, you must use either `None` for the default, or
any `string` value for a custom `sep` argument.

```python
>>> print("a", "b", sep='')

ab
```

- You can use `join()` function also to achieve the same output as above such as

```python
>>> print(''.join(["a", "b"]))

ab
```

### `end`

- `sep` above helped us to separate our input arguments with literally anything
we want in `string` format, but what about for custom ends?

```python
>>> print("arch\nlinux")

arch
linux
```
- ps. `\n` is a special escape character about which another post will be published regarding. In short here, you can remind as it is a special character, which is used in the strings to move the afterward string to a brand new line.

- We could easily put `\n` character as there was a need for it at only one space. But are we supposed to do it manually every time even for larger number of input arguments? :))

```python
>>> print(1,2,3,4,5,6,7,8,9,10, sep="\n")

1
2
3
4
5
6
7
8
9
10
```

- Have you ever used just blank `print()` function between the other to separate
them by a blank new line as follows?

```python
>>> print(1)
>>> print()
>>> print(2)

1

2
```

- Well, there is a reason standing behind that, which is the `end="\n"` argument
of `print()` function being equal to `"\n"` by default. So, unless you modify
the value of `end`, it will add new blank lines by default. However, as always,
you can also change this value to anything else you want.


```python
>>> print("today is my birthday", end=".")

today is my birthday.>>>
```

```python
>>> print("today is my birthday", end=".\n")

today is my birthday.
>>>
```

- `None` for `end=None` is as same `end="\n"`

```python
>>> print("hello!", end=None)

hello!
>>>
```

### `file`

- This is by far my favorite. This is where python lets you to customize the
output value, so instead of writing the output in the terminal, you can actually write it anywhere you want by changing this parameter.

```python
>>> f = open("test.txt", "w")
>>> print("i love python", file=f)
>>> f.close()

-> $PATH/test.txt -> 
i love python
>>>
```

- If you have never seen `open()` function before, in short, in python it helps you to open a file and write anything inside it. In the code snippet above, we are changing the default parameter of `f=sys.stdout` to `f=open("test.txt", "w")`, so as `sys.stdout` writes the output to the terminal, by replacing it with the `.txt` extensioned file, it is supposed to write to the file, and not display it in the terminal at all. However, make sure to close the file by `f.close()` as python will not write to the file even it will finish the execution successfully without closing the specified file.

### `flush`

- `flush` is actually `file` related parameter. By default, unfortunately, you
can not really write to the file unless you close it at the end. However, `flush`
lets you to write to file as soon as writing to the file snippet is executed without
even closing the actual file.

```python
>>> f = open("test.txt", "w")
>>> print("i will not close the .txt file", file=f, flush=True)

-> $PATH/test.txt -> 
i will not close the .txt file
>>>
```

# Interesting stuff

### `*`

- How to achieve the output of `l.i.n.u.x` without printing it out directly as 
it is?

```python
>>> print('l', 'i', 'n', 'u', 'x', sep=".")

l.i.n.u.x
```

- The code snippet above is absolutely correct, however, there is an even easier
way to achieve this goal.

```python
>>> print(*"linux", sep=".")

l.i.n.u.x
```

- `*` before the strings helps you to separate each character of the string to
multiple inputted characters, which makes the process easier. however, keep in
your mind that it used only for `string` type of values.

Feel free to contribute to the articles on [Github](https://github.com/woosal1337/blog/tree/main/web-app/source/_posts).
