/**
 *
 * logger.js
 *
 * This singleton wrapper of Winston.js can be used to log to
 * a local file, accessible from both client and server.
 *
 * If more customization is required,
 * work directly with Winston.js
 * (https://github.com/winstonjs/winston)
 *
 * Use this wrapper like so:
 *
 *   import logger from '../modules/logger';
 *   logger.info({message:'event-message', anyDataKey:anyDataObject});
 *
 * Timestamps are appended by default.
 *
 * Your log files will be found at:
 *    /usr/local/var/log/<project-name>/
 *
 */

let logger;

if(Meteor.isServer) {

  // Import server libraries
  import winston from 'winston';
  import fs from 'fs';
  import { check } from 'meteor/check';

  winston.setLevels(winston.config.npm.levels);
  winston.addColors(winston.config.npm.colors);

  const folders = process.env.PWD.split('/');
  const projectId = folders[folders.length - 1];
  const logDirectory = '/usr/local/var/log';
  const projectDirectory = logDirectory + '/' + projectId;

  // Create log directory if it does not exist
  if (fs.existsSync(logDirectory) == false) {
    fs.mkdirSync(logDirectory);
  }

  // Create project directory if it does not exist
  if (fs.existsSync(projectDirectory) == false) {
    fs.mkdirSync(projectDirectory);
  }

  /*
   * Create logger instance
   * with local file transport.
   */
  logger = new(winston.Logger)({
    transports: [
      new winston.transports.File({
        filename: projectDirectory + '/LOG-' + (new Date().toISOString()) + '.log',
        maxsize: 1024 * 1024 * 10, // 10MB
      }),
      ],
    exitOnError: false, // Do not exit logger if error is encountered
  });

  /*
   * Expose winston log
   * methods to client.
   */
  Meteor.methods({

    logDebug: function(data) {
      check(data, Object);
      logger.debug(data);
    },
    logInfo: function(data) {
      check(data, Object);
      logger.info(data);
    },
    logWarn: function(data) {
      check(data, Object);
      logger.warn(data);
    },
    logError: function(data) {
      check(data, Object);
      logger.error(data);
    },

  });

}

/*
 * Attach client-side methods
 * to exposed meteor methods.
 */
if(Meteor.isClient) {

  logger = {
    debug: function(data) {
      Meteor.call('logDebug', data);
    },
    info: function(data) {
      Meteor.call('logInfo', data);
    },
    warn: function(data) {
      Meteor.call('logWarn', data);
    },
    error: function(data) {
      Meteor.call('logError', data);
    },
  };

}

module.exports = logger;
