# Regressoes lineares generalizadas
# glm -> Trabalha com distribuicoes Binomiais
# Definir sucesso e falha

# mod <- glm(y~x, family = binarie)

# Importar os dados do Titanic
# dados (Titanic)

# Exibir os 5 primeiros elementos
# head(Titanic)

# Exibe os atributos do data frame
# str(Titanic)7

# --------------------- Resultado ---------------------
# table [1:4, 1:2, 1:2, 1:2] 0 0 35 0 0 0 17 0 118 154 ...
# - attr(*, "dimnames")=List of 4
#  ..$ Class   : chr [1:4] "1st" "2nd" "3rd" "Crew"
#  ..$ Sex     : chr [1:2] "Male" "Female"
#  ..$ Age     : chr [1:2] "Child" "Adult"
#  ..$ Survived: chr [1:2] "No" "Yes"

# Exibe o formato que ele veio
# class(Titanic)
# "table"

# Transformar a tabela em um data frame
# titanic <- as.data.frame(Titanic)

# head(titanic)
#  Class    Sex   Age Survived Freq
#1   1st   Male Child       No    0
#2   2nd   Male Child       No    0
#3   3rd   Male Child       No   35
#4  Crew   Male Child       No    0
#5   1st Female Child       No    0
#6   2nd Female Child       No    0

# Exibir o data Frame
View(titanic)

install.packages("dplyr")
install.packages("titanic")

library(titanic)

# Nome do dataset: ttanic_train

# --------- Expandindo as frequencias ------------
# Determina quais sao as linhas com frequencia maior que 0
# maior_zero <- which(titanic_train$Freq > 0)

# Repete as linhas maiores que zero pela frequencia
# rep2 <- rep(maior_zero, titanic_train$Freq[maior_zero])

# Cria a nova base com as frequencias expandidas
# titanic <- titanic_train[rep2 , ]
# -------------------------------------------------

