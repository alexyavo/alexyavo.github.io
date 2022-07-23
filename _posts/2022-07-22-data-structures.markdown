---
layout: post
title:  "Data Structures"
date:   2022-07-22
---

- [Real Time Collision Detection Book]( https://www.amazon.com/Real-Time-Collision-Detection-Interactive-Technology/dp/1558607323)

- [Extreme Cleverness: Functional Data Structures in Scala](http://vimeo.com/20262239) 
- [The Guerrilla Guide to Pure Functional Programming](http://vimeo.com/20293743)

- AVL trees, B-trees, hash tables, skip lists, radix trees, union-find, equality graphs, finger trees, Wavelet trees, FM-indices, suffix arrays, de-brujn graphs, string graphs, Merkle-DAGs, huets zipper, disjoint-sets, fenwick trees, multiset, bk-tree, succint trie, gap buffers, K-D tree, succint data structures, rose tree

- burrows-wheeler transform, fst (finite state transducer), nested set model, fountain codes (reconstruct data from random selection of packets), BURS (bottom up rewrite system)

- ROPE / CORD

- CRDTs (Conflict-free Replicated Data Type)

- Time-traveling data structueres (see MIT Advanced Data Structures).

- Judy Arrays == optimized 256-ary radix trees. 

- Piece Tables (for text editors) ([vscode blog](https://code.visualstudio.com/blogs/2018/03/23/text-buffer-reimplementation))

## Bloom Filters

`contains(x)` 

if returns `false` then `x` is not in collection.

if returns `true` then `x` is in collection with some proabability P.

use case: 1M black listed IP addresses. You need to filter out requests coming w/ black listed addresses. 

time complexity of `contains` & `insert` operations does not depend on # of existing elements but on # of hash functions used. 

see also: *Golomb Coded Sets* 

- XOR filters: fater and more memory efficient, but immutable.
- Ribbon filters

- Cuckoo Filter allows for `delete`. 

## CHAMP Compressed Hash Array Mapped Prefix-tree

state of the art persistent hash table 

## LDA Latent Dirichlet Allocation

represents documents as mixtures of topics that spit out words with certain probabilities.

"LDA assumes that each document in a corpus contains a mix of topics that are found throughout the entire corpus. The topic structure is hidden - we can only observe the documents and words, not the topics themselves. Because the structure is hidden (also known as latent), this method seeks to infer the topic structure given the known words and documents."

## Lazy Adaptive Trees

B-tree where the updates to the tree are buffered in the branch nodes and are propagated down to the leaf nodes at a later point in time.

## HAMT Hash Array Mapped Trie

make efficient immutable data structures possible. Clojure is built on it.

## Sparse Sets

often used in ECS (Entity Component System) architectures 

`O(1)` add/remove/find

## Crit-bit trees

TRIES 

TRASH - A dynamic LC-trie and hash data structure (combines trie w/ hash function)

## Splay Trees

binary search tree that splay the tree when searching, rebalancing it so the search result is on top. 

optimizes lookup for recently accessed items.

## Memoized Future Maps 

Instead of using `Map<K, V>` use `Map<K, Future<V>>` so that if several operations request the same key, only one will do the work (e.g. I/O or computation) and the others will benefit from it. 


## Cache Oblivious

- [(paper link)](https://cs.au.dk/~gerth/MassiveData02/notes/demaine.pdf) Cache-oblivious algorithms perform well on a multilevel memory hierarchy without knowing any parameters of the hierarchy, only knowing the existence of a hierarchy. Equivalently, a single cache-oblivious algorithm is efficient on all memory hierarchies simultaneously. 

- Frigo, Leiserson, Prokop, and Ramachandran; 1999

## Appendix: Data Analysis Tools


- [Data Sketches library](https://datasketches.apache.org/) (+ [Introduction to the library](https://www.youtube.com/watch?v=nO9pauS-mGQ))

### HyperLogLog (HLL)
estimate cardinality of data set.

you can split data between multiple servers, precompute HLL for all IPs every minute, and then ask "how many unique IPs were there yesterday".
