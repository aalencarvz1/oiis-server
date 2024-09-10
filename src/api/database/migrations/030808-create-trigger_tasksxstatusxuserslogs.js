'use strict';

/*imports*/
/** @type {import('sequelize-cli').Migration} */

/*migration*/
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS TRG_TIMETASKTRACKER`);
    await queryInterface.sequelize.query(`
    CREATE  TRIGGER TRG_TIMETASKTRACKER BEFORE UPDATE ON TASKSXSTATUSXUSERS FOR EACH ROW BEGIN
      IF old.IDSTATUS = 2 AND new.IDSTATUS NOT IN (2) THEN 
        SET new.ACCUMTIME = coalesce(new.ACCUMTIME,0) + (
            
            /*UNWORKEDS TYMES, ACCORDING TIMES WORK OF USER*/
            (
          CASE
            WHEN COALESCE((SELECT COUNT(1) FROM user_profile_timeworks UP JOIN user_timeworks ut ON ut.iduserprofiletimework = up.id WHERE UP.IDUSER = new.IDUSER and up.name = 'DEFAULT'),0) > 0 THEN
              COALESCE((
                select 	
                            
                  /*complete weeks * sum time week */
                  case 
                    when DATEDIFF(utc_timestamp,new.lastrun) > 7 then 
                      COALESCE(((DATEDIFF(
                        DATE_ADD(utc_timestamp, INTERVAL(-CASE WHEN WEEKDAY(utc_timestamp) = 6 THEN 0 ELSE WEEKDAY(utc_timestamp)+1 END) DAY), 
                        DATE_ADD(new.LASTRUN, INTERVAL(7-CASE WHEN WEEKDAY(new.LASTRUN) > 0 THEN WEEKDAY(new.LASTRUN) ELSE 7 END) DAY)
                      ) + 1 ) div 7) * (
                        select 
                          sum(time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))))
                        from 
                          user_profile_timeworks UP
                          join user_timeworks ut on ut.iduserprofiletimework = up.id
                        where
                          up.iduser = new.IDUSER
                          and up.name = 'DEFAULT'
                      ),0)  
                    else
                      0
                  end
                  + 
                                
                  /*complete days on first week, except the first run day * sum time per day */
                  COALESCE((select 
                    sum(time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))))
                  from 
                    user_profile_timeworks UP
                    join user_timeworks ut on ut.iduserprofiletimework = up.id
                  where
                    up.iduser = new.IDUSER
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(new.LASTRUN) > 0 
                      or DATEDIFF(utc_timestamp,new.lastrun) <= 7
                    )
                    and ut.WEEKDAY > weekday(new.LASTRUN)
                    AND datediff(utc_timestamp,date_add(new.LASTRUN,interval(ut.WEEKDAY - weekday(new.lastrun)) day)) > 0
                  ),0)
                  + 
                                
                  /*complete days on last week, except the last run day * sum time per day */
                  COALESCE((select 
                    sum(time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))))
                  from 
                    user_profile_timeworks UP
                    join user_timeworks ut on ut.iduserprofiletimework = up.id
                  where
                    up.iduser = new.IDUSER
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(utc_timestamp) < 6 
                      or DATEDIFF(utc_timestamp,new.lastrun) <= 7
                    )
                    and ut.WEEKDAY < weekday(utc_timestamp)
                    AND datediff(new.lastrun,date_add(utc_timestamp,interval((weekday(utc_timestamp) - ut.WEEKDAY) * -1) day)) < 0                               
                  ),0)
                  + 
                                
                  /*time of first day run */
                  coalesce((select 
                    sum(coalesce(
                      time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))) 
                        - case 
                          when time_to_sec(date_format(DATE_ADD(new.lastrun,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) <= time_to_sec(coalesce(ut.startat,0)) then 
                            0 + case when datediff(new.lastrun,utc_timestamp) = 0 then
                                case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) > time_to_sec(coalesce(ut.startat,0)) then 
                                  case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) < time_to_sec(coalesce(ut.endat,0)) then
                                    time_to_sec(coalesce(ut.endat,0)) - time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) 
                                  else 0
                                  end
                                else time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))) 
                                end
                              else 0
                            end
                          when time_to_sec(date_format(DATE_ADD(new.lastrun,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) < time_to_sec(coalesce(ut.endat,0)) then 
                            (time_to_sec(date_format(DATE_ADD(new.lastrun,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) - time_to_sec(coalesce(ut.startat,0))) 
                              + case when datediff(new.lastrun,utc_timestamp) = 0 then
                                case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) > time_to_sec(coalesce(ut.startat,0)) then 
                                  case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) < time_to_sec(coalesce(ut.endat,0)) then
                                    time_to_sec(coalesce(ut.endat,0)) - time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.LASTTIMEZONEOFFSET,0)) SECOND),'%H:%i:%s')) 
                                  else 0
                                  end
                                else time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))) 
                                end
                              else 0
                            end
                          else 
                            time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))) 
                      end
                    ,0))
                  from
                    user_profile_timeworks UP
                    join users u on u.id = up.iduser
                    join user_timeworks ut on ut.iduserprofiletimework = up.id
                  where
                    up.iduser = new.IDUSER
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(new.LASTRUN) > 0 
                      or DATEDIFF(utc_timestamp,new.lastrun) <= 7
                    )
                    and ut.WEEKDAY = weekday(new.LASTRUN)
                  ),0)
                  + 
                                
                  /*time of last day run */
                  coalesce((select
                    sum(coalesce(
                      time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))) 
                        - case 
                          when time_to_sec(date_format(date_add(utc_timestamp,interval(coalesce(u.LASTTIMEZONEOFFSET,0)) second),'%H:%i:%s')) >= time_to_sec(coalesce(ut.endat,0)) then 
                            0
                          when time_to_sec(date_format(date_add(utc_timestamp,interval(coalesce(u.LASTTIMEZONEOFFSET,0)) second),'%H:%i:%s')) > time_to_sec(coalesce(ut.startat,0)) then 
                            time_to_sec(coalesce(ut.endat,0)) - time_to_sec(date_format(date_add(utc_timestamp,interval(coalesce(u.LASTTIMEZONEOFFSET,0)) second),'%H:%i:%s'))
                          else 
                            time_to_sec(timediff(coalesce(ut.ENDAT,0),coalesce(ut.STARTAT,0))) 
                      end
                    ,0)) as tot
                  from
                    user_profile_timeworks UP
                    join users u on u.id = up.iduser
                    join user_timeworks ut on ut.iduserprofiletimework = up.id
                  where 
                    up.iduser = new.IDUSER
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(utc_timestamp) < 6 
                      or DATEDIFF(utc_timestamp,new.lastrun) <= 7
                    )
                    and ut.WEEKDAY = weekday(utc_timestamp)
                    and datediff(new.lastrun,utc_timestamp) <> 0
                  ),0)						
              ),0)
                    ELSE 
              TIMESTAMPDIFF(
                SECOND, 
                coalesce(
                new.LASTRUN,
                (SELECT MAX(T2.created_at) FROM TASKSXSTATUSXUSERSLOGS T2 WHERE T2.IDTASKXSTATUSXUSER = new.id AND T2.IDNEWSTATUS=2),
                utc_timestamp
                ),
                utc_timestamp
              )
          END
        )
        );
      END IF;
      END
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS TRG_TIMETASKTRACKER`);
  }
};