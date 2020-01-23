'use strict'

const Tweet = use('App/Models/Tweet.js');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {
  /**
   * Show a list of all tweets.
   * GET tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const tweets = await Tweet.query().with('user').fetch();

    return tweets;
  }

  /**
   * Create/save a new tweet.
   * POST tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request , auth }) {
    const data = request.only(['content']);

    const tweet = Tweet.create({user_id : auth.user.id , ...data});

    return tweet;
  }

  /**
   * Display a single tweet.
   * GET tweets/:id
   *
   * @param {object} ctx
   *
   */
  async show ({ params }) {
    const tweet = await Tweet.findOrFail(params.id);

    return tweet;
  }


  /**
   * Delete a tweet with id.
   * DELETE tweets/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params, auth}) {
    const tweet = Tweet.findOrFail(params.id);

    if(tweet.user_id !== auth.user.id){
      await response.status(401);
    }

    await tweet.delete();

  }
}

module.exports = TweetController
