# Adjacency Matrix Exporter

This Plugin wants to build two types of numerical adjacency matrices that can be exported in CSV format for subsequent processing with other software.

An adjacency matrix is a different way to represent an Obsidian graph.

It starts with a square grid of cells, where each **row** of cells represents a single note in your vault, and so does each **column**.
If note `i` is linked to note `j`, then the cell in row `i` and column `j` will be the link weight, i.e. the number of links between the two notes.

You can think of it as a grid of all the **links** in your vault.
Each row is a _node_ in your graph, and each cell is an _edge_.


## Description of plugin

When the user clicks on the plugin icon he is faced with an interaction window with three possible actions: two buttons and a link.

the first button exports the adjacency matrix of the Vault notes in Absolute mode: the weights of the edges are given by the number of connections from one note to another.

the second button exports the adjacency matrix of the Vault in Normalized mode: the weight of the edge from note A to note B is divided by the number of total words in note A.

the link allows the user to change the separator of the CSV file according to their needs.


## CSV file saving configuration

CSV files are saved in the Vault folder by default. These files report the export mode, date and time the file was created.


## Options

user can choose the default CSV separator and destination folder of the created CSV file.


## Author

Daniele Grazzini is a student of the Management Engineering degree course at the UNINETTUNO faculty based in Rome: https://www.uninettunouniversity.net.

This work was carried out for the three-year thesis in Management Engineering for the subject Industrial Plants.

The lecturer is Prof. Andrea Falegnami, Phd, Eng.


## thanks

I would like to thank SkepticMystic for his monumental work that served as the foundation for creating this plugin. I recommend everyone to visit his Github: https://github.com/SkepticMystic in particular I was inspired by this work: https://github.com/SkepticMystic/adjacency-matrix-maker
