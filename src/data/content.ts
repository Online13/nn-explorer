export const CONTENTS: Record<string, string> = {
	"io-input":
		"### Input\n**But** : Définir la forme de l’entrée dans le modèle.  \n**Utilisation** : Première couche du modèle, spécifie le format attendu des données.  \n**Entrée** : Aucune (point d’entrée du réseau)  \n**Sortie** : Tensor avec shape=[1,1,28,28] (batch, channel, height, width)",
	"io-output":
		"### Output\n**But** : Spécifie la sortie finale du modèle.  \n**Utilisation** : Dernière couche, permet de récupérer la prédiction.  \n**Entrée** : Tensor de n’importe quelle forme  \n**Sortie** : Dépend du modèle (souvent une classe ou un vecteur)",
	"io-identity":
		"### Identity\n**But** : Transmettre l’entrée telle quelle sans modification.  \n**Utilisation** : Pour le debug ou les architectures conditionnelles.  \n**Entrée** : Tout tensor  \n**Sortie** : Même tensor, inchangé",
	"dense-linear":
		"### Linear\n**But** : Appliquer une transformation linéaire : y = Wx + b  \n**Utilisation** : Couche dense classique pour les MLP.  \n**Entrée** : Tensor 2D (batch, in_features)  \n**Sortie** : Tensor 2D (batch, out_features)",
	"dense-lazy-linear":
		"### LazyLinear\n**But** : Même que Linear, mais infère automatiquement in_features à la première exécution.  \n**Utilisation** : Pratique lorsque in_features est inconnu à l’avance.  \n**Entrée** : Tensor 2D  \n**Sortie** : Tensor 2D",
	"dense-embedding":
		"### Embedding\n**But** : Transformer des indices en vecteurs continus (ex: mots → vecteurs).  \n**Utilisation** : NLP, embeddings de tokens.  \n**Entrée** : Tensor d’indices entiers  \n**Sortie** : Tensor 2D (batch, embedding_dim)",
	"dense-flatten":
		"### Flatten\n**But** : Aplatir un tenseur (hors batch) pour entrer dans une couche dense.  \n**Utilisation** : Transition entre convolution et couche fully connected.  \n**Entrée** : Tensor nD  \n**Sortie** : Tensor 2D (batch, -1)",
	"dense-unflatten":
		"### Unflatten\n**But** : Reconvertir un vecteur 1D en tenseur multidimensionnel.  \n**Utilisation** : Reconstruction de forme dans autoencodeurs ou GANs.  \n**Entrée** : Tensor 2D  \n**Sortie** : Tensor nD selon spécifications",
	"dense-reshape":
		"### Reshape (View)\n**But** : Changer la forme d’un tenseur sans changer les données.  \n**Utilisation** : Ajuster les dimensions selon le modèle.  \n**Entrée** : Tensor  \n**Sortie** : Tensor avec shape=[…]",
	"dense-dropout":
		"### Dropout\n**But** : Régularisation, empêche le surapprentissage.  \n**Utilisation** : Masque aléatoirement des neurones à chaque batch (probabilité p).  \n**Entrée** : Tensor  \n**Sortie** : Tensor avec certains éléments mis à zéro",
	"dense-dropout1d":
		"### Dropout1d\n**But** : Version 1D du Dropout, appliqué à chaque canal.  \n**Utilisation** : NLP, séquences.  \n**Entrée** : Tensor 3D (batch, channel, length)  \n**Sortie** : Tensor avec dropout sur les canaux",
	"dense-dropout2d":
		"### Dropout2d\n**But** : Dropout spatial pour les images.  \n**Utilisation** : Vision, régularisation des CNN.  \n**Entrée** : Tensor 4D (batch, channel, height, width)  \n**Sortie** : Tensor avec des canaux entiers masqués",
	"dense-dropout3d":
		"### Dropout3d\n**But** : Dropout pour les données 3D (ex : vidéos, volumes).  \n**Utilisation** : Réseaux 3D convolutifs.  \n**Entrée** : Tensor 5D  \n**Sortie** : Tensor avec dropout sur blocs 3D",
};
