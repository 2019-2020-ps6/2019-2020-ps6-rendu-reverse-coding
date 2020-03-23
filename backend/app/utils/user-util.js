const { Player, User } = require('../models')

function associateAllPlayers() {
    const users = User.get();
    const players = Player.get();
    const usersWithPlayers = users.map((user) => {
        return {...user, players: players.filter((player) =>
                player.userId === user.id,
            )}
    });

    return usersWithPlayers
}

function associatePlayers(userId) {
    const user = User.getById(userId)
    const players = Player.get();
    const userWithPlayers =  {...user, players: players.filter((player) =>
            player.userId === user.id
        )};

    return userWithPlayers;
}


module.exports = {
    associateAllPlayers,
    associatePlayers,
}
