import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Team {
  id: number;
  name: string;
  logo_url: string;
  games_played: number;
  wins: number;
  losses: number;
  overtime_losses: number;
  goals_for: number;
  goals_against: number;
  points: number;
}

interface Match {
  id: number;
  home_team_id: number;
  away_team_id: number;
  home_team_name: string;
  away_team_name: string;
  match_date: string;
  home_score: number;
  away_score: number;
  status: string;
  season: string;
}

interface Player {
  id: number;
  name: string;
  team_id: number;
  team_name: string;
  number: number;
  position: string;
  games_played: number;
  goals: number;
  assists: number;
  points: number;
  penalty_minutes: number;
}

interface News {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  published_at: string;
  author: string;
}

interface Regulation {
  id: number;
  title: string;
  content: string;
  section_order: number;
}

function Index() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [leagueLogo, setLeagueLogo] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoDialog, setShowLogoDialog] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [editDialog, setEditDialog] = useState<{ open: boolean; type: string; item: any }>({ open: false, type: '', item: null });

  useEffect(() => {
    const savedTeams = localStorage.getItem('vhl_teams');
    const savedMatches = localStorage.getItem('vhl_matches');
    const savedPlayers = localStorage.getItem('vhl_players');
    const savedNews = localStorage.getItem('vhl_news');
    const savedRegulations = localStorage.getItem('vhl_regulations');
    const savedLeagueLogo = localStorage.getItem('vhl_league_logo');

    if (savedTeams) setTeams(JSON.parse(savedTeams));
    else fetchTeams();
    
    if (savedMatches) setMatches(JSON.parse(savedMatches));
    else fetchMatches();
    
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    else fetchPlayers();
    
    if (savedNews) setNews(JSON.parse(savedNews));
    else fetchNews();
    
    if (savedRegulations) setRegulations(JSON.parse(savedRegulations));
    else fetchRegulations();

    if (savedLeagueLogo) setLeagueLogo(savedLeagueLogo);
  }, []);

  useEffect(() => {
    localStorage.setItem('vhl_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('vhl_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('vhl_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('vhl_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('vhl_regulations', JSON.stringify(regulations));
  }, [regulations]);

  useEffect(() => {
    localStorage.setItem('vhl_league_logo', leagueLogo);
  }, [leagueLogo]);

  const fetchTeams = async () => {
    const mockTeams: Team[] = [
      { id: 1, name: 'Салават Юлаев', logo_url: '', games_played: 15, wins: 10, losses: 3, overtime_losses: 2, goals_for: 45, goals_against: 30, points: 32 },
      { id: 2, name: 'Металлург Мг', logo_url: '', games_played: 15, wins: 9, losses: 4, overtime_losses: 2, goals_for: 42, goals_against: 33, points: 29 },
      { id: 3, name: 'Авангард', logo_url: '', games_played: 15, wins: 8, losses: 5, overtime_losses: 2, goals_for: 40, goals_against: 35, points: 26 },
      { id: 4, name: 'Трактор', logo_url: '', games_played: 15, wins: 7, losses: 6, overtime_losses: 2, goals_for: 38, goals_against: 37, points: 23 },
      { id: 5, name: 'ЦСКА', logo_url: '', games_played: 15, wins: 11, losses: 2, overtime_losses: 2, goals_for: 50, goals_against: 28, points: 35 },
      { id: 6, name: 'СКА', logo_url: '', games_played: 15, wins: 10, losses: 3, overtime_losses: 2, goals_for: 47, goals_against: 30, points: 32 },
      { id: 7, name: 'Динамо М', logo_url: '', games_played: 15, wins: 9, losses: 4, overtime_losses: 2, goals_for: 44, goals_against: 32, points: 29 },
      { id: 8, name: 'Спартак', logo_url: '', games_played: 15, wins: 6, losses: 7, overtime_losses: 2, goals_for: 35, goals_against: 40, points: 20 },
    ];
    setTeams(mockTeams);
  };

  const fetchMatches = async () => {
    const mockMatches: Match[] = [
      { id: 1, home_team_id: 1, away_team_id: 2, home_team_name: 'Салават Юлаев', away_team_name: 'Металлург Мг', match_date: '2025-11-05T19:00:00', home_score: 0, away_score: 0, status: 'scheduled', season: '2025/2026' },
      { id: 2, home_team_id: 3, away_team_id: 4, home_team_name: 'Авангард', away_team_name: 'Трактор', match_date: '2025-11-05T19:30:00', home_score: 0, away_score: 0, status: 'scheduled', season: '2025/2026' },
      { id: 3, home_team_id: 5, away_team_id: 6, home_team_name: 'ЦСКА', away_team_name: 'СКА', match_date: '2025-11-06T18:00:00', home_score: 0, away_score: 0, status: 'scheduled', season: '2025/2026' },
    ];
    setMatches(mockMatches);
  };

  const fetchPlayers = async () => {
    const mockPlayers: Player[] = [
      { id: 1, name: 'Александр Иванов', team_id: 1, team_name: 'Салават Юлаев', number: 10, position: 'Нападающий', games_played: 15, goals: 12, assists: 15, points: 27, penalty_minutes: 10 },
      { id: 2, name: 'Дмитрий Петров', team_id: 1, team_name: 'Салават Юлаев', number: 27, position: 'Защитник', games_played: 15, goals: 3, assists: 10, points: 13, penalty_minutes: 20 },
      { id: 3, name: 'Сергей Федоров', team_id: 5, team_name: 'ЦСКА', number: 91, position: 'Нападающий', games_played: 15, goals: 15, assists: 12, points: 27, penalty_minutes: 8 },
      { id: 4, name: 'Андрей Смирнов', team_id: 5, team_name: 'ЦСКА', number: 17, position: 'Вратарь', games_played: 15, goals: 0, assists: 1, points: 1, penalty_minutes: 2 },
    ];
    setPlayers(mockPlayers);
  };

  const fetchNews = async () => {
    const mockNews: News[] = [
      { id: 1, title: 'Старт нового сезона VHL!', content: 'Виртуальная Хоккейная Лига объявляет о старте сезона 2025/2026. В этом году нас ждут захватывающие матчи между лучшими командами!', image_url: 'https://cdn.poehali.dev/files/4938ef37-c2bf-4454-a473-3f5ff414e071.png', published_at: new Date().toISOString(), author: 'Администрация лиги' },
      { id: 2, title: 'ЦСКА лидирует в турнирной таблице', content: 'После 15 игр ЦСКА уверенно держит первое место с 35 очками.', published_at: new Date().toISOString(), author: 'Администрация лиги' },
    ];
    setNews(mockNews);
  };

  const fetchRegulations = async () => {
    const mockRegulations: Regulation[] = [
      { id: 1, title: 'Общие положения', content: 'Виртуальная Хоккейная Лига (VHL) - это онлайн-турнир по виртуальному хоккею. Все участники обязаны соблюдать правила честной игры.', section_order: 1 },
      { id: 2, title: 'Система начисления очков', content: 'Победа в основное время: 3 очка. Победа в овертайме/буллитах: 2 очка. Поражение в овертайме/буллитах: 1 очко. Поражение в основное время: 0 очков.', section_order: 2 },
      { id: 3, title: 'Формат турнира', content: 'Регулярный сезон состоит из 48 игр для каждой команды. По итогам регулярного сезона 8 лучших команд выходят в плей-офф.', section_order: 3 },
    ];
    setRegulations(mockRegulations);
  };

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      toast.success('Вход выполнен успешно!');
    } else {
      toast.error('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setUsername('');
    setPassword('');
    toast.success('Выход выполнен');
  };

  const openEditDialog = (type: string, item: any = null) => {
    setEditDialog({ open: true, type, item: item || getEmptyItem(type) });
  };

  const closeEditDialog = () => {
    setEditDialog({ open: false, type: '', item: null });
  };

  const getEmptyItem = (type: string) => {
    switch (type) {
      case 'team':
        return { id: Date.now(), name: '', logo_url: '', games_played: 0, wins: 0, losses: 0, overtime_losses: 0, goals_for: 0, goals_against: 0, points: 0 };
      case 'match':
        return { id: Date.now(), home_team_id: teams[0]?.id || 1, away_team_id: teams[1]?.id || 2, match_date: new Date().toISOString().slice(0, 16), home_score: 0, away_score: 0, status: 'scheduled', season: '2025/2026' };
      case 'player':
        return { id: Date.now(), name: '', team_id: teams[0]?.id || 1, number: 0, position: 'Нападающий', games_played: 0, goals: 0, assists: 0, points: 0, penalty_minutes: 0 };
      case 'news':
        return { id: Date.now(), title: '', content: '', image_url: '', author: 'Администрация лиги', published_at: new Date().toISOString() };
      case 'regulation':
        return { id: Date.now(), title: '', content: '', section_order: regulations.length + 1 };
      default:
        return {};
    }
  };

  const handleSave = () => {
    const { type, item } = editDialog;
    
    switch (type) {
      case 'team':
        setTeams(prev => {
          const exists = prev.find(t => t.id === item.id);
          return exists ? prev.map(t => t.id === item.id ? item : t) : [...prev, item];
        });
        toast.success(teams.find(t => t.id === item.id) ? 'Команда обновлена' : 'Команда добавлена');
        break;
      case 'match':
        setMatches(prev => {
          const homeTeam = teams.find(t => t.id === item.home_team_id);
          const awayTeam = teams.find(t => t.id === item.away_team_id);
          const updatedItem = { ...item, home_team_name: homeTeam?.name || '', away_team_name: awayTeam?.name || '' };
          const exists = prev.find(m => m.id === item.id);
          return exists ? prev.map(m => m.id === item.id ? updatedItem : m) : [...prev, updatedItem];
        });
        toast.success(matches.find(m => m.id === item.id) ? 'Матч обновлён' : 'Матч добавлен');
        break;
      case 'player':
        setPlayers(prev => {
          const team = teams.find(t => t.id === item.team_id);
          const updatedItem = { ...item, team_name: team?.name || '', points: (item.goals || 0) + (item.assists || 0) };
          const exists = prev.find(p => p.id === item.id);
          return exists ? prev.map(p => p.id === item.id ? updatedItem : p) : [...prev, updatedItem];
        });
        toast.success(players.find(p => p.id === item.id) ? 'Игрок обновлён' : 'Игрок добавлен');
        break;
      case 'news':
        setNews(prev => {
          const exists = prev.find(n => n.id === item.id);
          return exists ? prev.map(n => n.id === item.id ? item : n) : [...prev, item];
        });
        toast.success(news.find(n => n.id === item.id) ? 'Новость обновлена' : 'Новость добавлена');
        break;
      case 'regulation':
        setRegulations(prev => {
          const exists = prev.find(r => r.id === item.id);
          return exists ? prev.map(r => r.id === item.id ? item : r) : [...prev, item];
        });
        toast.success(regulations.find(r => r.id === item.id) ? 'Регламент обновлён' : 'Регламент добавлен');
        break;
    }
    
    closeEditDialog();
  };

  const handleDelete = (type: string, id: number) => {
    switch (type) {
      case 'team':
        setTeams(prev => prev.filter(t => t.id !== id));
        toast.success('Команда удалена');
        break;
      case 'match':
        setMatches(prev => prev.filter(m => m.id !== id));
        toast.success('Матч удалён');
        break;
      case 'player':
        setPlayers(prev => prev.filter(p => p.id !== id));
        toast.success('Игрок удалён');
        break;
      case 'news':
        setNews(prev => prev.filter(n => n.id !== id));
        toast.success('Новость удалена');
        break;
      case 'regulation':
        setRegulations(prev => prev.filter(r => r.id !== id));
        toast.success('Регламент удалён');
        break;
    }
  };

  const sortedTeams = teams.sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative group"
                onClick={() => isAdmin && setShowLogoDialog(true)}
              >
                {leagueLogo ? (
                  <img src={leagueLogo} alt="League Logo" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Icon name="Trophy" className="text-primary-foreground" size={28} />
                )}
                {isAdmin && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Upload" className="text-white" size={20} />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">VHL</h1>
                <p className="text-xs text-muted-foreground">Виртуальная Хоккейная Лига</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://t.me/vhl1112" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <Icon name="Send" size={16} />
                Telegram канал
              </a>
              {isAdmin ? (
                <Button onClick={handleLogout} variant="outline">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выход
                </Button>
              ) : (
                <Button onClick={() => setShowLogin(true)} variant="outline">
                  <Icon name="Lock" size={16} className="mr-2" />
                  Админ-панель
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="standings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card border border-border">
            <TabsTrigger value="standings">
              <Icon name="Award" size={16} className="mr-2" />
              Таблица
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Icon name="Calendar" size={16} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Icon name="Users" size={16} className="mr-2" />
              Команды
            </TabsTrigger>
            <TabsTrigger value="players">
              <Icon name="User" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="regulations">
              <Icon name="FileText" size={16} className="mr-2" />
              Регламент
            </TabsTrigger>
            <TabsTrigger value="news">
              <Icon name="Newspaper" size={16} className="mr-2" />
              Новости
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standings" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={20} />
                  Турнирная таблица
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('team')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить команду
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>#</TableHead>
                      <TableHead>Команда</TableHead>
                      <TableHead className="text-center">И</TableHead>
                      <TableHead className="text-center">В</TableHead>
                      <TableHead className="text-center">П</TableHead>
                      <TableHead className="text-center">ПО</TableHead>
                      <TableHead className="text-center">О</TableHead>
                      {isAdmin && <TableHead></TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTeams.map((team, idx) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-bold">{idx + 1}</TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {team.logo_url ? (
                              <img src={team.logo_url} alt={team.name} className="w-6 h-6 object-contain" />
                            ) : (
                              <Icon name="Shield" size={20} className="text-muted-foreground" />
                            )}
                            {team.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">{team.games_played}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{team.wins}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{team.losses}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{team.overtime_losses}</TableCell>
                        <TableCell className="text-center font-bold">{team.points}</TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => openEditDialog('team', team)}>
                                <Icon name="Edit" size={14} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete('team', team.id)}>
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Расписание матчей
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('match')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить матч
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map(match => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-right flex-1">
                          <p className="font-semibold">{match.home_team_name}</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline">
                            {match.home_score} : {match.away_score}
                          </Badge>
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-semibold">{match.away_team_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm text-muted-foreground">
                          {new Date(match.match_date).toLocaleDateString('ru-RU')}
                          <br />
                          {new Date(match.match_date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {isAdmin && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => openEditDialog('match', match)}>
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete('match', match.id)}>
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Команды лиги
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teams.map(team => (
                    <div key={team.id} className="p-6 bg-muted/50 rounded-lg border transition-colors text-center">
                      <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                        {team.logo_url ? (
                          <img src={team.logo_url} alt={team.name} className="w-16 h-16 object-contain" />
                        ) : (
                          <Icon name="Shield" size={32} />
                        )}
                      </div>
                      <h3 className="font-bold mb-2">{team.name}</h3>
                      <div className="mt-3 pt-3 border-t">
                        <p className="font-bold text-lg">{team.points} очков</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Статистика игроков
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('player')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить игрока
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Игрок</TableHead>
                      <TableHead>Команда</TableHead>
                      <TableHead className="text-center">№</TableHead>
                      <TableHead className="text-center">Поз</TableHead>
                      <TableHead className="text-center">И</TableHead>
                      <TableHead className="text-center">Г</TableHead>
                      <TableHead className="text-center">П</TableHead>
                      <TableHead className="text-center">О</TableHead>
                      {isAdmin && <TableHead></TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.sort((a, b) => b.points - a.points).map(player => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell className="text-muted-foreground">{player.team_name}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{player.number}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{player.position}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{player.games_played}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{player.goals}</TableCell>
                        <TableCell className="text-center text-muted-foreground">{player.assists}</TableCell>
                        <TableCell className="text-center font-bold">{player.points}</TableCell>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => openEditDialog('player', player)}>
                                <Icon name="Edit" size={14} />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDelete('player', player.id)}>
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regulations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Регламент лиги
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('regulation')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить раздел
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {regulations.sort((a, b) => a.section_order - b.section_order).map(reg => (
                    <div key={reg.id} className="p-6 bg-muted/50 rounded-lg border relative">
                      {isAdmin && (
                        <div className="absolute top-4 right-4 flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEditDialog('regulation', reg)}>
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete('regulation', reg.id)}>
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-3">{reg.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{reg.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Newspaper" size={20} />
                  Новости лиги
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('news')}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить новость
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {news.map(item => (
                    <div key={item.id} className="p-6 bg-muted/50 rounded-lg border transition-colors relative">
                      {isAdmin && (
                        <div className="absolute top-4 right-4 flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => openEditDialog('news', item)}>
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete('news', item.id)}>
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      )}
                      {item.image_url && (
                        <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                      )}
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{new Date(item.published_at).toLocaleDateString('ru-RU')}</span>
                        <span>•</span>
                        <span>{item.author}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Lock" size={20} />
              Вход в админ-панель
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm mb-2 block">Логин</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-sm mb-2 block">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Логин: admin / Пароль: admin123
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialog.open} onOpenChange={closeEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editDialog.type === 'team' && 'Редактирование команды'}
              {editDialog.type === 'match' && 'Редактирование матча'}
              {editDialog.type === 'player' && 'Редактирование игрока'}
              {editDialog.type === 'news' && 'Редактирование новости'}
              {editDialog.type === 'regulation' && 'Редактирование регламента'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {editDialog.type === 'team' && editDialog.item && (
              <>
                <div>
                  <Label>Название команды</Label>
                  <Input
                    value={editDialog.item.name}
                    onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, name: e.target.value } }))}
                  />
                </div>

                <div>
                  <Label>Логотип команды</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditDialog(prev => ({ ...prev, item: { ...prev.item, logo_url: reader.result as string } }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {editDialog.item.logo_url && (
                    <div className="mt-2">
                      <img src={editDialog.item.logo_url} alt="Logo preview" className="w-20 h-20 object-contain border rounded" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Игры</Label>
                    <Input type="number" value={editDialog.item.games_played} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, games_played: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Победы</Label>
                    <Input type="number" value={editDialog.item.wins} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, wins: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Поражения</Label>
                    <Input type="number" value={editDialog.item.losses} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, losses: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Поражения ОТ</Label>
                    <Input type="number" value={editDialog.item.overtime_losses} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, overtime_losses: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Голы забитые</Label>
                    <Input type="number" value={editDialog.item.goals_for} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, goals_for: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Голы пропущенные</Label>
                    <Input type="number" value={editDialog.item.goals_against} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, goals_against: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Очки</Label>
                    <Input type="number" value={editDialog.item.points} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, points: +e.target.value } }))} />
                  </div>
                </div>
              </>
            )}

            {editDialog.type === 'match' && editDialog.item && (
              <>
                <div>
                  <Label>Хозяева</Label>
                  <Select value={editDialog.item.home_team_id?.toString()} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, home_team_id: +val } }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Гости</Label>
                  <Select value={editDialog.item.away_team_id?.toString()} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, away_team_id: +val } }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Дата и время</Label>
                  <Input type="datetime-local" value={editDialog.item.match_date?.slice(0, 16)} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, match_date: e.target.value } }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Счёт хозяев</Label>
                    <Input type="number" value={editDialog.item.home_score} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, home_score: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Счёт гостей</Label>
                    <Input type="number" value={editDialog.item.away_score} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, away_score: +e.target.value } }))} />
                  </div>
                </div>
                <div>
                  <Label>Статус</Label>
                  <Select value={editDialog.item.status} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, status: val } }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Запланирован</SelectItem>
                      <SelectItem value="live">В прямом эфире</SelectItem>
                      <SelectItem value="finished">Завершён</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {editDialog.type === 'player' && editDialog.item && (
              <>
                <div>
                  <Label>Имя игрока</Label>
                  <Input value={editDialog.item.name} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, name: e.target.value } }))} />
                </div>
                <div>
                  <Label>Команда</Label>
                  <Select value={editDialog.item.team_id?.toString()} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, team_id: +val } }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Номер</Label>
                    <Input type="number" value={editDialog.item.number} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, number: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Позиция</Label>
                    <Select value={editDialog.item.position} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, position: val } }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Нападающий">Нападающий</SelectItem>
                        <SelectItem value="Защитник">Защитник</SelectItem>
                        <SelectItem value="Вратарь">Вратарь</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Игры</Label>
                    <Input type="number" value={editDialog.item.games_played} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, games_played: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Голы</Label>
                    <Input type="number" value={editDialog.item.goals} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, goals: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Передачи</Label>
                    <Input type="number" value={editDialog.item.assists} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, assists: +e.target.value } }))} />
                  </div>
                  <div>
                    <Label>Штрафные минуты</Label>
                    <Input type="number" value={editDialog.item.penalty_minutes} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, penalty_minutes: +e.target.value } }))} />
                  </div>
                </div>
              </>
            )}

            {editDialog.type === 'news' && editDialog.item && (
              <>
                <div>
                  <Label>Заголовок</Label>
                  <Input value={editDialog.item.title} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, title: e.target.value } }))} />
                </div>
                <div>
                  <Label>Содержание</Label>
                  <Textarea value={editDialog.item.content} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, content: e.target.value } }))} className="min-h-32" />
                </div>
                <div>
                  <Label>URL изображения</Label>
                  <Input value={editDialog.item.image_url || ''} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, image_url: e.target.value } }))} />
                </div>
                <div>
                  <Label>Автор</Label>
                  <Input value={editDialog.item.author} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, author: e.target.value } }))} />
                </div>
              </>
            )}

            {editDialog.type === 'regulation' && editDialog.item && (
              <>
                <div>
                  <Label>Заголовок</Label>
                  <Input value={editDialog.item.title} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, title: e.target.value } }))} />
                </div>
                <div>
                  <Label>Содержание</Label>
                  <Textarea value={editDialog.item.content} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, content: e.target.value } }))} className="min-h-32" />
                </div>
                <div>
                  <Label>Порядок отображения</Label>
                  <Input type="number" value={editDialog.item.section_order} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, section_order: +e.target.value } }))} />
                </div>
              </>
            )}

            <Button onClick={handleSave} className="w-full">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-muted border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Виртуальная Хоккейная Лига. Все права защищены.
          </p>
        </div>
      </footer>

      <Dialog open={showLogoDialog} onOpenChange={setShowLogoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Логотип лиги</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Загрузить логотип</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setLeagueLogo(reader.result as string);
                      setShowLogoDialog(false);
                      toast.success('Логотип лиги обновлён');
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            {leagueLogo && (
              <div className="flex flex-col items-center gap-2">
                <Label>Текущий логотип</Label>
                <img src={leagueLogo} alt="League Logo" className="w-20 h-20 object-cover rounded-lg border" />
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    setLeagueLogo('');
                    setShowLogoDialog(false);
                    toast.success('Логотип лиги удалён');
                  }}
                >
                  <Icon name="Trash2" size={14} className="mr-2" />
                  Удалить логотип
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;