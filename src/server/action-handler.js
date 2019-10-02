const actions = require('../common/actions')

function createActionHandler(id, db, userAdapter, getAdapter) {
  return async (action) => {
    switch (action.type) {
      case actions.PLAY_GAME:
        const { username } = action
        const { game, user, opponent } =
          await db.play(id, username, userAdapter.getType())
        userAdapter.connect()
        if (opponent) {
          const opponentAdapter = getAdapter(opponent.id)
          if (game && opponentAdapter) {
            userAdapter.play(game.state)
            opponentAdapter.play(game.state)
            console.log(`Start game between ${user.username} and ${opponent.username} players`)
          }
        }
        break;
      case actions.USER_STEP:
        const { error, state } = await db.move(id, action.payload)
        if (error) {
          console.log(error)
          return
        }
        userAdapter.move(state)
        break;
    }
  }
}

module.exports = createActionHandler
