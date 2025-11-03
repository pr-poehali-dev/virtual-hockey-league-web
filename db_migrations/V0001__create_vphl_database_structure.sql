-- Таблица команд
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url TEXT,
    conference VARCHAR(20) NOT NULL CHECK (conference IN ('Восточная', 'Западная')),
    games_played INT DEFAULT 0,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    overtime_losses INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица игроков
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id),
    name VARCHAR(100) NOT NULL,
    number INT,
    position VARCHAR(20),
    games_played INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    points INT DEFAULT 0,
    penalty_minutes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица матчей
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    home_team_id INT REFERENCES teams(id),
    away_team_id INT REFERENCES teams(id),
    match_date TIMESTAMP NOT NULL,
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'finished')),
    season VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author VARCHAR(100) DEFAULT 'Администрация лиги'
);

-- Таблица регламента
CREATE TABLE IF NOT EXISTS regulations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    section_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица администраторов
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тестовых данных

-- Команды Восточной конференции
INSERT INTO teams (name, logo_url, conference, games_played, wins, losses, overtime_losses, goals_for, goals_against, points) VALUES
('Салават Юлаев', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Salavat_Yulaev_Ufa_Logo.svg/200px-Salavat_Yulaev_Ufa_Logo.svg.png', 'Восточная', 15, 10, 3, 2, 45, 30, 32),
('Металлург Мг', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Metallurg_Magnitogorsk_logo.svg/200px-Metallurg_Magnitogorsk_logo.svg.png', 'Восточная', 15, 9, 4, 2, 42, 33, 29),
('Авангард', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Avangard_Omsk_Logo_2013.svg/200px-Avangard_Omsk_Logo_2013.svg.png', 'Восточная', 15, 8, 5, 2, 40, 35, 26),
('Трактор', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Traktor_Chelyabinsk_Logo.svg/200px-Traktor_Chelyabinsk_Logo.svg.png', 'Восточная', 15, 7, 6, 2, 38, 37, 23);

-- Команды Западной конференции
INSERT INTO teams (name, logo_url, conference, games_played, wins, losses, overtime_losses, goals_for, goals_against, points) VALUES
('ЦСКА', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/HC_CSKA_Moscow_logo.svg/200px-HC_CSKA_Moscow_logo.svg.png', 'Западная', 15, 11, 2, 2, 50, 28, 35),
('СКА', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/SKA_Saint_Petersburg_logo.svg/200px-SKA_Saint_Petersburg_logo.svg.png', 'Западная', 15, 10, 3, 2, 47, 30, 32),
('Динамо М', 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/HC_Dynamo_Moscow_logo.svg/200px-HC_Dynamo_Moscow_logo.svg.png', 'Западная', 15, 9, 4, 2, 44, 32, 29),
('Спартак', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/HC_Spartak_Moscow_logo.svg/200px-HC_Spartak_Moscow_logo.svg.png', 'Западная', 15, 6, 7, 2, 35, 40, 20);

-- Матчи
INSERT INTO matches (home_team_id, away_team_id, match_date, home_score, away_score, status, season) VALUES
(1, 2, '2025-11-05 19:00:00', 0, 0, 'scheduled', '2025/2026'),
(3, 4, '2025-11-05 19:30:00', 0, 0, 'scheduled', '2025/2026'),
(5, 6, '2025-11-06 18:00:00', 0, 0, 'scheduled', '2025/2026'),
(7, 8, '2025-11-06 19:00:00', 0, 0, 'scheduled', '2025/2026'),
(1, 3, '2025-11-01 19:00:00', 3, 2, 'finished', '2025/2026'),
(5, 7, '2025-11-01 19:30:00', 4, 1, 'finished', '2025/2026');

-- Игроки
INSERT INTO players (team_id, name, number, position, games_played, goals, assists, points, penalty_minutes) VALUES
(1, 'Александр Иванов', 10, 'Нападающий', 15, 12, 15, 27, 10),
(1, 'Дмитрий Петров', 27, 'Защитник', 15, 3, 10, 13, 20),
(5, 'Сергей Федоров', 91, 'Нападающий', 15, 15, 12, 27, 8),
(5, 'Андрей Смирнов', 17, 'Вратарь', 15, 0, 1, 1, 2);

-- Новости
INSERT INTO news (title, content, image_url) VALUES
('Старт нового сезона VPHL!', 'Виртуальная Хоккейная Лига объявляет о старте сезона 2025/2026. В этом году нас ждут захватывающие матчи между лучшими командами!', 'https://cdn.poehali.dev/files/4938ef37-c2bf-4454-a473-3f5ff414e071.png'),
('ЦСКА лидирует в Западной конференции', 'После 15 игр ЦСКА уверенно держит первое место в Западной конференции с 35 очками.', NULL);

-- Регламент
INSERT INTO regulations (title, content, section_order) VALUES
('Общие положения', 'Виртуальная Хоккейная Лига (VPHL) - это онлайн-турнир по виртуальному хоккею. Все участники обязаны соблюдать правила честной игры.', 1),
('Система начисления очков', 'Победа в основное время: 3 очка. Победа в овертайме/буллитах: 2 очка. Поражение в овертайме/буллитах: 1 очко. Поражение в основное время: 0 очков.', 2),
('Формат турнира', 'Регулярный сезон состоит из 48 игр для каждой команды. По итогам регулярного сезона 8 лучших команд выходят в плей-офф.', 3);

-- Админ по умолчанию (логин: admin, пароль: admin123)
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
