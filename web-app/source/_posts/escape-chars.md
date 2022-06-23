---
title: escape chars
date: 2021-09-02 01:08:20
tags:
---

# introduction

- if you have not read [print()](https://www.woosal.com/2021/09/01/print/) article yet, make sure to read first by [clicking here](https://www.woosal.com/2021/09/01/print/) before reading this article, so you can have a better understanding overall.

- python's most used string manipulations with [`pythonic`](https://www.google.com/search?q=pythonic+way+of+coding&sxsrf=AOaemvIz2Ny-BGwCj0qp9kWjFiQMQOqFLg%3A1630534912350&ei=AP0vYaDwFPWN9u8PtuuN2A8&oq=pythonic+way+of+coding&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsANKBAhBGABQ6QdY6Qdg8gdoAHADeACAAQCIAQCSAQCYAQCgAQHIAQjAAQE&sclient=gws-wiz&ved=0ahUKEwig8Pnx597yAhX1hv0HHbZ1A_sQ4dUDCA4&uact=5) way, a.k.a `escape characters`

- there are a few `escape characters` in python, you can find the full list in the table below:

|escape char name|what it does?|
|:--:|:--:|
|`\` |you can use `\` inside a string|
|`\n`|adds a new blank line after where it was used|
|`\t`|adds a tab (4 spaces) after where it was used|
|`\u`|shows the `unicode` conversion|
|`\U`|shows the `unicode` conversion|
|`\N`|shows the `unicode name` conversion|
|`\x`|shows the `hexadecimal` conversion|
|`\a`|plays a `bip!` sound on the supported devices|
|`\r`|replaces the before string characters with the after ones where it was placed|
|`\v`|adds a new line and uses a tab in the same line on the supported devices|
|`\b`|replaces as many string characters after as `\b` where it was placed as many times to the right|
|`\f`|moves to a new page (not really used anymore)|
|`r`|frees the used string so it will not execute any escape chars in it|

# usage

### `\`

- while it was already discussed in [`print()`](https://www.woosal.com/2021/09/01/print/) article how to resolve quotations 
issues, throughout this one, new ways will be shown to fix them.

```python
>>> print("Hello, "my" friend!")

print("Hello, "my" friend!")
                   ^
SyntaxError: invalid syntax
```

- we already know that the code snippet above should have thrown a SyntaxError due to the quotations' crashes. in order to tell python that we are going to use quotation, which is actually a part of the string not the python syntax, we use `\` as shown below.

```python
>>> print("Hello, \"my\" friend!")

Hello, "my" friend!
```

- besides just the quotation marks' issues, it also helps to solve one of the most faced
python issues, especially on `windows` regarding the path and directory namings.

```python
>>> print("C:\Users\woosal\Desktop\python.exe")

print("C:\Users\woosal\Desktop\python.exe")
          ^
SyntaxError: (unicode error) 'unicodeescape' codec can't decode bytes in position 2-3: truncated \UXXXXXXXX escape
```

- as was displayed in the code above, unfortunately, windows path and directory
namings are not really python friendly (plz use linux). in order to fix it, `\`
can be used as follows

```python
>>> print("C:\\Users\\woosal\\Desktop\\python.exe")

C:\Users\woosal\Desktop\python.exe
```

- you can accept `\` disables the python's string syntax usage for the character
that comes right after `\`'s usage.

### `\n`

- one of the possible escape chars to move to a blank new line

```python
>>> print(1)
>>> print()
>>> print(2)

1

2
```

- `\n` can be used in order to simplify the code snippet above with the exact
same output as below

```python
>>> print(1, "\n")
>>> print(2)

1

2
```

- very simple, right? what about combining `sep` with `\n` ?

```python
>>> print(1,2,3,4,5, sep="\n")

1
2
3
4
5
```

### `\t`

- putting tabs (4 x spaces) is as easy as using `\t`

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

- this command might not work on your device, however, it was created to make
a sound as `bip`

```python
>>> print("\a")

!bip!
```

- if you are psycho, and would like to listen to this sound effect multiple times
for some reason, you can use the code below

```python
>>> print("\a" * 10)

!bip!!bip!!bip!!bip!!bip!!bip!!bip!!bip!!bip!!bip!
```

### `\r`

- this is where stuff gets more interesting and weird. `\r` was meant to be used
so wherever it is placed, anything after `\r` is actually becoming the start of
the whole string before the `\r`. it might be tough to understand at first, so
let me show you over the examples for better grasping

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

- depending on the examples above, try to find the logic yourself, however, i will help you out with that. after the `\r` if the length of the string is longer that the length of the string on the left side of `\r`, then whole string becomes the string that is on the right side of `\r`. however, if the length of the string staying on the left side of the `\r` is longer, then the string on the right side is starting to replace each according index of the characters on the left side of the string, and the rest of the string is going to be kept as same of the left side string. kinda confusing when explained, so try to find the logic yourself, it is quite simple, also make sure to do some simple applications

### `\v`

- this escape char actually helps you to add lower tabs, which might sound dumb,
so let's move to the examples directly

```python
>>> print("1\v2\v3\v4\v5")

1
    2
        3
            4
                5
```

- "this is also called as `stairways to heaven` effect" - woosal

### `\b`

- this might look like `\r`, however, there is a slight difference, which is
while `\r` actually replaces the whole string from the beginning, `\b` replaces
each of the characters from the left side of the string to the characters on the
right side of the `\b`

```python
>>> print("google.com\b.uk")

google.co.uk
```

- as was displayed above, only 1 `\b` was used, which means the string on the 
right side of the `\b` will replace the string on the left starting from `\b` times
from the last index

```python
>>> print("github.com\b\b\borg")

github.org
```

### `\u`

- a simple and brief built-in python unicode converter

```python
>>> print("\u0070")

p
```

```python
>>> print("\u0071")

q
```

- by [clicking here](https://unicode-table.com/en/), you can find the unicode character table and how they are
represented

### `/U`

- pretty much the same as `\u`, however, the representations are in longer in 
terms of length

```python
>>> print('\U00000055')

U
```

```python
>>> print('\U00000056')

V
```

### `\N`

- while in UNICODE system every character has its own unique code representation,
they do also have a unique long naming convention, whereas, `\N` helps you to find
them

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

- as it is possible to find the UNICODE long naming of a character, it is also
possible to reverse it vice versa as follows

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

- built-in python hexadecimal converter

```python
>>> print("\x41")

A
```

```python
>>> print("\x69")

i
```

### `r`

- be careful, it is not a typo. there is not any `\` in this one. also, instead
of being used within the string type of data, it is actually used right in front
of them, neither in the middle, nor the end. this char is going to actually disable
python's in string index syntaxing, so python will not really apply any of the above
escape character in your strings, resulting in anything you write within your string
to be kept exactly as same.


```python
>>> print("C:\name\table\vvs")

C:
ame able
        vs
```

- check the sample above. by default, python check the string, if does find any
matching escape characters being used, then instantly applies it. in order to disable
python's checking, try adding `\r` in front of whole string

```python
>>> print(r"C:\name\table\vvs")

C:\name\table\vvs
```

### `\f`

- fortunately, this is not really being used nowadays, and not really going to
be useful to use in most cases.
