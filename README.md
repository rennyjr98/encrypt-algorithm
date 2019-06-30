# Encrypt-algorithm

In math, encryption is a set of algebraic operations using matrices. In this page you can see a simple code using a simple encrypt algorithm. The method that implemented is about multiplication of matrices, first:

# Preparation

For prepare the terrain ee have to find a matrix that have a inverse matrix, to encrypt and decrypt the data, on this case we have the next matrices.

```
Encoding matrices:     Decoding matrices:
[1, -1, 2]             [4, 3/2, -2]
|-2, 0, 4|             |7, 7/2, -4|
[2, 1, -1]             [2,  1 , -1]
```
Then we have to create a list  that represent each letter of alphabet with numbers, from a to z, and then we have to create a matrix with that numbers, that matrix has to have the same rows than columns than the encoding matrix with some logic order, in this case for example we will use the message "Hello world"

```
const SPACE = 52;
var codex = { a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7, i:8, j:9, k:10, l:11, m:12,
                n:13, o:14, p:15, q:16, r:17, s:18, t:19, u:20, v:21, w:22, x:23, y:24,
                z:25};
                
Message "Hello world"

Then: Hello world = [7, 4, 11, 11, 14, 52, 22, 14, 17, 11, 3]
```
# Encryption

Now we have two matrices with some atributes that in math, can be multiplied each other, the rule is if the matrix A has the same columns than rows of the matrix B then can be multiplied. On this case:

```
Matrix A (Encoding matrix)      Matrix B (Replace matrix)     Operation
[1, -1, 2]                      [7 , 11, 22, 11]              [1, -1, 2] * [7 , 4, 11] = 25
|-2, 0, 4|                      |4 , 14, 14,  3|
[2, 1, -1]                      [11, 52, 17, 52]

Then
[25, 101, 42, 112]
|30, 186, 24, 186|
[69, 336, 91, 358]
```
Now we have the message encrypt.

# Decrypting

To decrypt the message the only thing we can do is multiplied the encrypt matrix with the decoding matrix, and result will be the matrix that containing the matrix with the replacement numbers. And then just remplace again with the letter in our dictionary and then we'll have the message.

```
Matrix A (Decoding matrix)     Matrix B (Matrix product)     Matrix result
[4, 3/2, -2]                   [25, 101, 42, 112]            [7 , 11, 22, 11]
|7, 7/2, -4|                   |30, 186, 24, 186|            |4 , 14, 14,  3|
[2,  1,  -1]                   [69, 336, 91, 358]            [11, 52, 17, 52]

Then
[H, L, W, L]
|E, O, O, D|
[L,  , R,  ]
```
