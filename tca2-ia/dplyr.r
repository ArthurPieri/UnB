# https://dplyr.tidyverse.org/
# http://material.curso-r.com/manip/
# https://cran.r-project.org/web/packages/dplyr/vignettes/dplyr.html

install.packages("tidyverse")

# mpg por tipo de transmissao
mean( mtcars$mpg[mtcars$am ==0] )
mean( mtcars$mpg[mtcars$am ==1] )

mean (mtcars$mpg)

# Agrupar por transmissao e tirar a media por grupo
mtcars %>%
    group_by(am) %>%
        summarise(Media = mean(mpg))

mtcars %>% 
    filter(am == 0 & mpg < 15)

# Criando coluna peso categorico
dados2 <- mtcars %>%
            mutate(Pc = ifelse( test = wt <2.5,
                                yes = "Leve",
                                no = ifelse(
                                    wt > 2.5 & wt < 3.6,
                                    "Medio",
                                    "Pesado")))

# Verificando os dados
dados2 %>%
    select(wt, Pc) %>%
    view()

# Media de consumo por categoria de peso
dados2 %>% 
    group_by(pc) %>%
    summarise(Media = mean(mpg))


# -------------------------------
# Criando a semente para a funcao pseudo aleatoria
set.seed(123)

# Gerando uma distribuicao de propabilidades
x <- runif(1000, -5, 5)

# Criando a equacao basica
# yi = Beta0 + Beta1X1 + Erro1
y <- 3 + 2.5*x + rnorm(1000, mean = 0, sd = 1)
# Rodando a regressao linear
mod <- lm(y ~ x)

# Plotando o grafico da distribuicao dos dados
plot(x, y, 
    col = "#33669966", 
    main = "Modelo Linear")

# Desenhando a linha 
abline(mod, col = "red")

# Criando o alpha e o beta
alpha <- 0.01
beta <- matrix( c(0,0), 
                nrow = 2)

# Criando a tabela de 1s e os numeros de x
X <- cbind(1, x)
head(X)

# Criando um historico das variacoes de Beta
beta_hist <- list()

# Calculando o erro
erro <- (y - X %*% beta)

# Calculando o gradiente
grad <- (-2) / length(y) * t(X) %*% erro

# Calculando o beta com taxa de aprendizado e gradiente
beta <- beta - alpha * grad

# Colocando o beta em beta hist
beta_hist[[i]] <- beta

# Loop para calcular
for(i in 1:1000) {
    erro <- (y - X %*% beta)
    grad <- (-2) / length(y) * t(X) %*% erro
    beta <- beta - alpha * grad
    beta_hist[[i]] <- beta
}

# Exibir o beta
beta

# Exibir os coeficientes calculados antes
mod$coefficients
# Os ois devem estar muito parecidos se nao igual

