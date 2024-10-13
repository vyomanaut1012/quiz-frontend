import SignUp from './components/pages/authentication/signUp/SignUp.jsx';
import SignIn from './components/pages/authentication/signIn/SignIn.jsx';
import CreateNewQuiz from './components/pages/quiz/createNewQuiz/CreateNewQuiz.jsx';
import PlayQuiz from './components/pages/quiz/playQuiz/PlayQuiz.jsx';
import Score from './components/pages/quiz/score/Score.jsx';

const routes = [
    {
        name: 'sign up',
        path: '/signup',
        component: SignUp
    },
    {
        name: 'sign in',
        path: '/signin',
        component: SignIn
    },
    {
        name: 'create new quiz',
        path: '/createnewquiz',
        component: CreateNewQuiz
    },
    {
        name: 'play quiz',
        path: '/playquiz',
        component: PlayQuiz
    },
    {
        name: 'score',
        path: '/score',
        component: Score
    },
];

export default routes;
