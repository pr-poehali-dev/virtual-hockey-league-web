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
  conference: string;
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [editDialog, setEditDialog] = useState<{ open: boolean; type: string; item: any }>({ open: false, type: '', item: null });

  useEffect(() => {
    fetchTeams();
    fetchMatches();
    fetchPlayers();
    fetchNews();
    fetchRegulations();
  }, []);

  const fetchTeams = async () => {
    const mockTeams: Team[] = [
      { id: 1, name: 'Салават Юлаев', logo_url: '', conference: 'Восточная', games_played: 15, wins: 10, losses: 3, overtime_losses: 2, goals_for: 45, goals_against: 30, points: 32 },
      { id: 2, name: 'Металлург Мг', logo_url: '', conference: 'Восточная', games_played: 15, wins: 9, losses: 4, overtime_losses: 2, goals_for: 42, goals_against: 33, points: 29 },
      { id: 3, name: 'Авангард', logo_url: '', conference: 'Восточная', games_played: 15, wins: 8, losses: 5, overtime_losses: 2, goals_for: 40, goals_against: 35, points: 26 },
      { id: 4, name: 'Трактор', logo_url: '', conference: 'Восточная', games_played: 15, wins: 7, losses: 6, overtime_losses: 2, goals_for: 38, goals_against: 37, points: 23 },
      { id: 5, name: 'ЦСКА', logo_url: '', conference: 'Западная', games_played: 15, wins: 11, losses: 2, overtime_losses: 2, goals_for: 50, goals_against: 28, points: 35 },
      { id: 6, name: 'СКА', logo_url: '', conference: 'Западная', games_played: 15, wins: 10, losses: 3, overtime_losses: 2, goals_for: 47, goals_against: 30, points: 32 },
      { id: 7, name: 'Динамо М', logo_url: '', conference: 'Западная', games_played: 15, wins: 9, losses: 4, overtime_losses: 2, goals_for: 44, goals_against: 32, points: 29 },
      { id: 8, name: 'Спартак', logo_url: '', conference: 'Западная', games_played: 15, wins: 6, losses: 7, overtime_losses: 2, goals_for: 35, goals_against: 40, points: 20 },
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
      { id: 1, title: 'Старт нового сезона VPHL!', content: 'Виртуальная Хоккейная Лига объявляет о старте сезона 2025/2026. В этом году нас ждут захватывающие матчи между лучшими командами!', image_url: 'https://cdn.poehali.dev/files/4938ef37-c2bf-4454-a473-3f5ff414e071.png', published_at: new Date().toISOString(), author: 'Администрация лиги' },
      { id: 2, title: 'ЦСКА лидирует в Западной конференции', content: 'После 15 игр ЦСКА уверенно держит первое место в Западной конференции с 35 очками.', published_at: new Date().toISOString(), author: 'Администрация лиги' },
    ];
    setNews(mockNews);
  };

  const fetchRegulations = async () => {
    const mockRegulations: Regulation[] = [
      { id: 1, title: 'Общие положения', content: 'Виртуальная Хоккейная Лига (VPHL) - это онлайн-турнир по виртуальному хоккею. Все участники обязаны соблюдать правила честной игры.', section_order: 1 },
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
        return { id: Date.now(), name: '', logo_url: '', conference: 'Восточная', games_played: 0, wins: 0, losses: 0, overtime_losses: 0, goals_for: 0, goals_against: 0, points: 0 };
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

  const eastTeams = teams.filter(t => t.conference === 'Восточная').sort((a, b) => b.points - a.points);
  const westTeams = teams.filter(t => t.conference === 'Западная').sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Trophy" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VPHL</h1>
                <p className="text-xs text-cyan-400">Виртуальная Хоккейная Лига</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Button onClick={handleLogout} variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выход
                </Button>
              ) : (
                <Button onClick={() => setShowLogin(true)} variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
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
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-cyan-500/20">
            <TabsTrigger value="standings" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="Award" size={16} className="mr-2" />
              Таблица
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="Calendar" size={16} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="Users" size={16} className="mr-2" />
              Команды
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="User" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="regulations" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="FileText" size={16} className="mr-2" />
              Регламент
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="Newspaper" size={16} className="mr-2" />
              Новости
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standings" className="space-y-6">
            {isAdmin && (
              <Button onClick={() => openEditDialog('team')} className="bg-cyan-500 hover:bg-cyan-600">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить команду
              </Button>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Icon name="Trophy" size={20} />
                    Восточная конференция
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-cyan-500/20 hover:bg-transparent">
                        <TableHead className="text-cyan-400">#</TableHead>
                        <TableHead className="text-cyan-400">Команда</TableHead>
                        <TableHead className="text-cyan-400 text-center">И</TableHead>
                        <TableHead className="text-cyan-400 text-center">В</TableHead>
                        <TableHead className="text-cyan-400 text-center">П</TableHead>
                        <TableHead className="text-cyan-400 text-center">ПО</TableHead>
                        <TableHead className="text-cyan-400 text-center">О</TableHead>
                        {isAdmin && <TableHead className="text-cyan-400"></TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eastTeams.map((team, idx) => (
                        <TableRow key={team.id} className="border-cyan-500/10 hover:bg-cyan-500/5">
                          <TableCell className="text-white font-bold">{idx + 1}</TableCell>
                          <TableCell className="text-white font-medium">{team.name}</TableCell>
                          <TableCell className="text-center text-slate-300">{team.games_played}</TableCell>
                          <TableCell className="text-center text-green-400">{team.wins}</TableCell>
                          <TableCell className="text-center text-red-400">{team.losses}</TableCell>
                          <TableCell className="text-center text-yellow-400">{team.overtime_losses}</TableCell>
                          <TableCell className="text-center text-cyan-400 font-bold">{team.points}</TableCell>
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

              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Icon name="Trophy" size={20} />
                    Западная конференция
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-cyan-500/20 hover:bg-transparent">
                        <TableHead className="text-cyan-400">#</TableHead>
                        <TableHead className="text-cyan-400">Команда</TableHead>
                        <TableHead className="text-cyan-400 text-center">И</TableHead>
                        <TableHead className="text-cyan-400 text-center">В</TableHead>
                        <TableHead className="text-cyan-400 text-center">П</TableHead>
                        <TableHead className="text-cyan-400 text-center">ПО</TableHead>
                        <TableHead className="text-cyan-400 text-center">О</TableHead>
                        {isAdmin && <TableHead className="text-cyan-400"></TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {westTeams.map((team, idx) => (
                        <TableRow key={team.id} className="border-cyan-500/10 hover:bg-cyan-500/5">
                          <TableCell className="text-white font-bold">{idx + 1}</TableCell>
                          <TableCell className="text-white font-medium">{team.name}</TableCell>
                          <TableCell className="text-center text-slate-300">{team.games_played}</TableCell>
                          <TableCell className="text-center text-green-400">{team.wins}</TableCell>
                          <TableCell className="text-center text-red-400">{team.losses}</TableCell>
                          <TableCell className="text-center text-yellow-400">{team.overtime_losses}</TableCell>
                          <TableCell className="text-center text-cyan-400 font-bold">{team.points}</TableCell>
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
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Расписание матчей
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('match')} className="bg-cyan-500 hover:bg-cyan-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить матч
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map(match => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-right flex-1">
                          <p className="text-white font-semibold">{match.home_team_name}</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                            {match.home_score} : {match.away_score}
                          </Badge>
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-white font-semibold">{match.away_team_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm text-slate-400">
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
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Команды лиги
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teams.map(team => (
                    <div key={team.id} className="p-6 bg-slate-900/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Icon name="Shield" size={32} className="text-cyan-400" />
                      </div>
                      <h3 className="text-white font-bold mb-1">{team.name}</h3>
                      <p className="text-sm text-slate-400">{team.conference}</p>
                      <div className="mt-3 pt-3 border-t border-cyan-500/20">
                        <p className="text-cyan-400 font-bold text-lg">{team.points} очков</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Статистика игроков
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('player')} className="bg-cyan-500 hover:bg-cyan-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить игрока
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyan-500/20 hover:bg-transparent">
                      <TableHead className="text-cyan-400">Игрок</TableHead>
                      <TableHead className="text-cyan-400">Команда</TableHead>
                      <TableHead className="text-cyan-400 text-center">№</TableHead>
                      <TableHead className="text-cyan-400 text-center">Поз</TableHead>
                      <TableHead className="text-cyan-400 text-center">И</TableHead>
                      <TableHead className="text-cyan-400 text-center">Г</TableHead>
                      <TableHead className="text-cyan-400 text-center">П</TableHead>
                      <TableHead className="text-cyan-400 text-center">О</TableHead>
                      {isAdmin && <TableHead className="text-cyan-400"></TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.sort((a, b) => b.points - a.points).map(player => (
                      <TableRow key={player.id} className="border-cyan-500/10 hover:bg-cyan-500/5">
                        <TableCell className="text-white font-medium">{player.name}</TableCell>
                        <TableCell className="text-slate-300">{player.team_name}</TableCell>
                        <TableCell className="text-center text-slate-300">{player.number}</TableCell>
                        <TableCell className="text-center text-slate-300">{player.position}</TableCell>
                        <TableCell className="text-center text-slate-300">{player.games_played}</TableCell>
                        <TableCell className="text-center text-green-400">{player.goals}</TableCell>
                        <TableCell className="text-center text-blue-400">{player.assists}</TableCell>
                        <TableCell className="text-center text-cyan-400 font-bold">{player.points}</TableCell>
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
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Регламент лиги
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('regulation')} className="bg-cyan-500 hover:bg-cyan-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить раздел
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {regulations.sort((a, b) => a.section_order - b.section_order).map(reg => (
                    <div key={reg.id} className="p-6 bg-slate-900/50 rounded-lg border border-cyan-500/10 relative">
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
                      <h3 className="text-xl font-bold text-cyan-400 mb-3">{reg.title}</h3>
                      <p className="text-slate-300 leading-relaxed">{reg.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Icon name="Newspaper" size={20} />
                  Новости лиги
                </CardTitle>
                {isAdmin && (
                  <Button onClick={() => openEditDialog('news')} className="bg-cyan-500 hover:bg-cyan-600">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить новость
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {news.map(item => (
                    <div key={item.id} className="p-6 bg-slate-900/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-colors relative">
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
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <span>{new Date(item.published_at).toLocaleDateString('ru-RU')}</span>
                        <span>•</span>
                        <span>{item.author}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="bg-slate-800 border-cyan-500/20">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 flex items-center gap-2">
              <Icon name="Lock" size={20} />
              Вход в админ-панель
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-white text-sm mb-2 block">Логин</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="bg-slate-900 border-cyan-500/20 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="bg-slate-900 border-cyan-500/20 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Войти
            </Button>
            <p className="text-sm text-slate-400 text-center">
              Логин: admin / Пароль: admin123
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialog.open} onOpenChange={closeEditDialog}>
        <DialogContent className="bg-slate-800 border-cyan-500/20 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">
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
                  <Label className="text-white">Название команды</Label>
                  <Input
                    value={editDialog.item.name}
                    onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, name: e.target.value } }))}
                    className="bg-slate-900 border-cyan-500/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Конференция</Label>
                  <Select value={editDialog.item.conference} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, conference: val } }))}>
                    <SelectTrigger className="bg-slate-900 border-cyan-500/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Восточная">Восточная</SelectItem>
                      <SelectItem value="Западная">Западная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Игры</Label>
                    <Input type="number" value={editDialog.item.games_played} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, games_played: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Победы</Label>
                    <Input type="number" value={editDialog.item.wins} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, wins: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Поражения</Label>
                    <Input type="number" value={editDialog.item.losses} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, losses: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Поражения ОТ</Label>
                    <Input type="number" value={editDialog.item.overtime_losses} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, overtime_losses: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Голы забитые</Label>
                    <Input type="number" value={editDialog.item.goals_for} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, goals_for: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Голы пропущенные</Label>
                    <Input type="number" value={editDialog.item.goals_against} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, goals_against: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Очки</Label>
                    <Input type="number" value={editDialog.item.points} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, points: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                </div>
              </>
            )}

            {editDialog.type === 'match' && editDialog.item && (
              <>
                <div>
                  <Label className="text-white">Хозяева</Label>
                  <Select value={editDialog.item.home_team_id?.toString()} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, home_team_id: +val } }))}>
                    <SelectTrigger className="bg-slate-900 border-cyan-500/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">Гости</Label>
                  <Select value={editDialog.item.away_team_id?.toString()} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, away_team_id: +val } }))}>
                    <SelectTrigger className="bg-slate-900 border-cyan-500/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">Дата и время</Label>
                  <Input type="datetime-local" value={editDialog.item.match_date?.slice(0, 16)} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, match_date: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Счёт хозяев</Label>
                    <Input type="number" value={editDialog.item.home_score} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, home_score: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Счёт гостей</Label>
                    <Input type="number" value={editDialog.item.away_score} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, away_score: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                </div>
                <div>
                  <Label className="text-white">Статус</Label>
                  <Select value={editDialog.item.status} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, status: val } }))}>
                    <SelectTrigger className="bg-slate-900 border-cyan-500/20 text-white">
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
                  <Label className="text-white">Имя игрока</Label>
                  <Input value={editDialog.item.name} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, name: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
                <div>
                  <Label className="text-white">Команда</Label>
                  <Select value={editDialog.item.team_id?.toString()} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, team_id: +val } }))}>
                    <SelectTrigger className="bg-slate-900 border-cyan-500/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map(t => <SelectItem key={t.id} value={t.id.toString()}>{t.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Номер</Label>
                    <Input type="number" value={editDialog.item.number} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, number: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Позиция</Label>
                    <Select value={editDialog.item.position} onValueChange={(val) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, position: val } }))}>
                      <SelectTrigger className="bg-slate-900 border-cyan-500/20 text-white">
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
                    <Label className="text-white">Игры</Label>
                    <Input type="number" value={editDialog.item.games_played} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, games_played: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Голы</Label>
                    <Input type="number" value={editDialog.item.goals} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, goals: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Передачи</Label>
                    <Input type="number" value={editDialog.item.assists} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, assists: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Штрафные минуты</Label>
                    <Input type="number" value={editDialog.item.penalty_minutes} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, penalty_minutes: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                  </div>
                </div>
              </>
            )}

            {editDialog.type === 'news' && editDialog.item && (
              <>
                <div>
                  <Label className="text-white">Заголовок</Label>
                  <Input value={editDialog.item.title} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, title: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
                <div>
                  <Label className="text-white">Содержание</Label>
                  <Textarea value={editDialog.item.content} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, content: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white min-h-32" />
                </div>
                <div>
                  <Label className="text-white">URL изображения</Label>
                  <Input value={editDialog.item.image_url || ''} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, image_url: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
                <div>
                  <Label className="text-white">Автор</Label>
                  <Input value={editDialog.item.author} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, author: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
              </>
            )}

            {editDialog.type === 'regulation' && editDialog.item && (
              <>
                <div>
                  <Label className="text-white">Заголовок</Label>
                  <Input value={editDialog.item.title} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, title: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
                <div>
                  <Label className="text-white">Содержание</Label>
                  <Textarea value={editDialog.item.content} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, content: e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white min-h-32" />
                </div>
                <div>
                  <Label className="text-white">Порядок отображения</Label>
                  <Input type="number" value={editDialog.item.section_order} onChange={(e) => setEditDialog(prev => ({ ...prev, item: { ...prev.item, section_order: +e.target.value } }))} className="bg-slate-900 border-cyan-500/20 text-white" />
                </div>
              </>
            )}

            <Button onClick={handleSave} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-slate-900 border-t border-cyan-500/20 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2025 Виртуальная Хоккейная Лига. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
