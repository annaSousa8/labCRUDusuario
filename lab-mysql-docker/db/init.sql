CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email)
VALUES
    ('Ana Silva', 'ana@email.com'),
    ('Carlos Souza', 'carlos@email.com')
ON DUPLICATE KEY UPDATE
    nome = VALUES(nome),
    email = VALUES(email);

CREATE TABLE IF NOT EXISTS team(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS game (
    id INT AUTO_INCREMENT PRIMARY KEY,

    team_A_id INT NOT NULL,
    team_B_id INT NOT NULL,

    first_time_id INT,
    second_time_id INT,

    CONSTRAINT fk_game_team_a
        FOREIGN KEY (team_A_id)
        REFERENCES team(id),

    CONSTRAINT fk_game_team_b
        FOREIGN KEY (team_B_id)
        REFERENCES team(id)
);