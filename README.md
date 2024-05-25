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


## Thanks

I would like to thank SkepticMystic for his monumental work that served as the foundation for creating this plugin. I recommend everyone to visit his Github: https://github.com/SkepticMystic in particular I was inspired by this work: https://github.com/SkepticMystic/adjacency-matrix-maker

## Areas under study for a 2.0.0 version

1) Currently the CSV file of both export modes consists of strings. I'm trying to obtain a CSV file already composed of numerical values ​​to prevent it from being immediately available for mathematical processing once introduced into Excel or similar programs.
2) The Normalized matrix achieves this result only for values ​​with commas thanks to the use, in the programming code, of the "replace" Typescript command which exchanges the period with the comma. Unfortunately, this decision does not suit Anglo-Saxon users who use a diametrically opposite convention and therefore still have to convert the entire matrix into a numerical matrix with some processing within Excel or other software.
3) I was notified of a bug when exporting large matrices that have empty notes and that the value "Infinity" appears among the results of the matrix. The logic that I have implemented in the programming prevents the appearance of something like this so I hypothesize the presence of errors in the programming and the generation of the Normalized matrix incorrectly. I warn users about this and therefore to check with other means whether the result produced is satisfactory or not for their purposes. I'm evaluating a path that seems the most likely to fix the bug.
4) I am also trying to modify the plugin icon to make it readable in both light and dark mode: from reports that I received which I then verified, there is no good evidence of the icon in light mode.

Thanks to all those who will report bugs and/or improvements to be made in the future.
mail: d.grazzini@students.uninettunouniversity.net
