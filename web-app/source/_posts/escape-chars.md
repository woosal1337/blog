---
title: Escape Chars
date: 2021-09-02 01:08:20
tags:
---

# Introduction

- If you have not read [print()](https://www.woosal.com/2021/09/01/print/) article yet, make sure to read first by [clicking here](https://www.woosal.com/2021/09/01/print/) before reading this article, so you can have a better understanding overall.

- Python's most used string manipulations with [`pythonic`](https://www.google.com/search?q=pythonic+way+of+coding&sxsrf=AOaemvIz2Ny-BGwCj0qp9kWjFiQMQOqFLg%3A1630534912350&ei=AP0vYaDwFPWN9u8PtuuN2A8&oq=pythonic+way+of+coding&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsANKBAhBGABQ6QdY6Qdg8gdoAHADeACAAQCIAQCSAQCYAQCgAQHIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwig8Pnx597yAhX1hv0HHbZ1A_sQ4dUDCA4&uact=5) way, a.k.a `escape characters`

- There are a few `escape characters` in Python, you can find the full list in the table below:

|Escape char name|What it does?|
|:--:|:--:|
|`\` |You can use `\` inside a string|
|`\n`|Adds a new blank line after where it was used|
|`\t`|Adds a tab (4 spaces) after where it was used|
|`\u`|Shows the `unicode` conversion|
|`\U`|Shows the `unicode` conversion|
|`\N`|Shows the `unicode name` conversion|
|`\x`|Shows the `hexadecimal` conversion|
|`\a`|Plays a `bip!` sound on the supported devices|
|`\r`|Replaces the before string characters with the after ones where it was placed|
|`\v`|Adds a new line and uses a tab in the same line on the supported devices|
|`\b`|Replaces as many string characters after as `\b` where it was placed as many times to the right|
|`\f`|Moves to a new page (not really used anymore)|
|`r`|Frees the used string so it will not execute any escape chars in it|

# Usage

### `\`

- While it was already discussed in [`print()`](https://www.woosal.com/2021/09/01/print/) article how to resolve quotations issues, throughout this one, new ways will be shown to fix them.

```python
>>> print("Hello, "my" friend!")

print("Hello, "my" friend!")
                   ^
SyntaxError: invalid syntax
```

- We already know that the code snippet above should have thrown a SyntaxError due to the quotations' crashes. In order to tell python that we are going to use quotation, which is actually a part of the string not the python syntax, we use `\` as shown below.

```python
>>> print("Hello, \"my\" friend!")

Hello, "my" friend!
```

- Besides just the quotation marks' issues, it also helps to solve one of the most faced Python issues, especially on `windows` regarding the path and directory namings.

```python
>>> print("C:\Users\woosal\Desktop\python.exe")

print("C:\Users\woosal\Desktop\python.exe")
          ^
SyntaxError: (unicode error) 'unicodeescape' codec can't decode bytes in position 2-3: truncated \UXXXXXXXX escape
```

- As was displayed in the code above, unfortunately, windows path and directory
namings are not really Python friendly (plz use linux). in order to fix it, `\`
can be used as follows

```python
>>> print("C:\\Users\\woosal\\Desktop\\python.exe")

C:\Users\woosal\Desktop\python.exe
```

- You can accept `\` disables the python's string syntax usage for the character
that comes right after `\`'s usage.

### `\n`

- One of the possible escape chars to move to a blank new line.

```python
>>> print(1)
>>> print()
>>> print(2)

1

2
```

- `\n` can be used in order to simplify the code snippet above with the exact
same output as below:

```python
>>> print(1, "\n")
>>> print(2)

1

2
```

- Very simple, right? What about combining `sep` with `\n` ?

```python
>>> print(1,2,3,4,5, sep="\n")

1
2
3
4
5
```

### `\t`

- Putting tabs (4 x spaces) is as easy as using `\t`

```python
>>> print("123\t456")

123    456
```

- 
"\t is also known as TAB effect"  - woosal

```python
>>> print(1,2,3,4,5, sep="\t")

1   2   3   4   5
```

### `\a`

- This command might not work on your device, however, it was created to make
a sound as `bip`.

```python
>>> print("\a")

!bip!
```

- If you are psycho, and would like to listen to this sound effect multiple times
for some reason, you can use the code below:

```python
>>> print("\a" * 10)

!bip!!bip!!bip!!bip!!bip!!bip!!bip!!bip!!bip!!bip!
```

### `\r`

- This is where stuff gets more interesting and weird. `\r` was meant to be used
so wherever it is placed, anything after `\r` is actually becoming the start of
the whole string before the `\r`. It might be tough to understand at first, so
let me show you over the examples for better grasping.

```python
>>> print("Hello\rWorld!")

World!
```

```python
>>> print("123456\r789")

789456
```

```python
>>> print("123\r789456")

789456
```

- Depending on the examples above, try to find the logic yourself, however, I will help you out with that. after the `\r` if the length of the string is longer that the length of the string on the left side of `\r`, then whole string becomes the string that is on the right side of `\r`. however, if the length of the string staying on the left side of the `\r` is longer, then the string on the right side is starting to replace each according index of the characters on the left side of the string, and the rest of the string is going to be kept as same of the left side string. Kinda confusing when explained, so try to find the logic yourself, it is quite simple, also make sure to do some simple applications.

### `\v`

- This escape char actually helps you to add lower tabs, which might sound dumb,
so let's move to the examples directly.

```python
>>> print("1\v2\v3\v4\v5")

1
    2
        3
            4
                5
```

- "This is also called as `stairways to heaven` effect." - woosal

### `\b`

- This might look like `\r`, however, there is a slight difference, which is
while `\r` actually replaces the whole string from the beginning, `\b` replaces
each of the characters from the left side of the string to the characters on the
right side of the `\b`.

```python
>>> print("google.com\b.uk")

google.co.uk
```

- As was displayed above, only 1 `\b` was used, which means the string on the 
right side of the `\b` will replace the string on the left starting from `\b` times
from the last index.

```python
>>> print("github.com\b\b\borg")

github.org
```

### `\u`

- A simple and brief built-in python unicode converter.

```python
>>> print("\u0070")

p
```

```python
>>> print("\u0071")

q
```

- By [clicking here](https://unicode-table.com/en/), you can find the unicode character table and how they are represented.

### `/U`

- Pretty much the same as `\u`, however, the representations are in longer in 
terms of length.

```python
>>> print('\U00000055')

U
```

```python
>>> print('\U00000056')

V
```

### `\N`

- While in UNICODE system every character has its own unique code representation,
they do also have a unique long naming convention, whereas, `\N` helps you to find
them.

```python
>>> import unicodedata as ucd
>>> print(ucd.name('a'))

LATIN SMALL LETTER A
```

```python
>>> import unicodedata as ucd
>>> print(ucd.name('Z'))

LATIN CAPITAL LETTER Z
```

- As it is possible to find the UNICODE long naming of a character, it is also
possible to reverse it vice versa as follows.

```python
>>> import unicodedata as ucd
>>> print("\N{LATIN CAPITAL LETTER A}")

A
```

```python
>>> import unicodedata as ucd
>>> print("\N{LATIN SMALL LETTER Z}")

z
```

### `\x`

- Built-in python hexadecimal converter.

```python
>>> print("\x41")

A
```

```python
>>> print("\x69")

i
```

### `r`

- Be careful, it is not a typo. There is not any `\` in this one. Also, instead
of being used within the string type of data, it is actually used right in front
of them, neither in the middle, nor the end. This char is going to actually disable
python's in string index syntax, so Python will not really apply any of the above
escape character in your strings, resulting in anything you write within your string
to be kept exactly as same.


```python
>>> print("C:\name\table\vvs")

C:
ame able
        vs
```

- Check the sample above. By default, Python check the string, if does find any
matching escape characters being used, then instantly applies it. In order to disable
python's checking, try adding `\r` in front of whole string.

```python
>>> print(r"C:\name\table\vvs")

C:\name\table\vvs
```

### `\f`

- Fortunately, this is not really being used nowadays, and not really going to
be useful to use in most cases.
