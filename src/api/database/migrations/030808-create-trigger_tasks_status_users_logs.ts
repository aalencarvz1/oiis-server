'use strict';

import { QueryInterface } from "sequelize";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS TRG_TIMETASKTRACKER`);
    await queryInterface.sequelize.query(`
    CREATE  TRIGGER TRG_TIMETASKTRACKER BEFORE UPDATE ON tasks_status_users FOR EACH ROW BEGIN
      IF old.status_id = 2 AND new.status_id NOT IN (2) THEN 
        SET new.accumulated_time = coalesce(new.accumulated_time,0) + (
            
            /*UNWORKEDS TYMES, ACCORDING TIMES WORK OF USER*/
            (
          CASE
            WHEN COALESCE((SELECT COUNT(1) FROM user_profile_timeworks UP JOIN user_timeworks ut ON ut.user_profile_time_work_id = up.id WHERE UP.user_id = new.user_id and up.name = 'DEFAULT'),0) > 0 THEN
              COALESCE((
                select 	
                            
                  /*complete weeks * sum time week */
                  case 
                    when DATEDIFF(utc_timestamp,new.last_run) > 7 then 
                      COALESCE(((DATEDIFF(
                        DATE_ADD(utc_timestamp, INTERVAL(-CASE WHEN weekday(utc_timestamp) = 6 THEN 0 ELSE weekday(utc_timestamp)+1 END) DAY), 
                        DATE_ADD(new.last_run, INTERVAL(7-CASE WHEN weekday(new.last_run) > 0 THEN weekday(new.last_run) ELSE 7 END) DAY)
                      ) + 1 ) div 7) * (
                        select 
                          sum(time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))))
                        from 
                          user_profile_timeworks UP
                          join user_timeworks ut on ut.user_profile_time_work_id = up.id
                        where
                          up.user_id = new.user_id
                          and up.name = 'DEFAULT'
                      ),0)  
                    else
                      0
                  end
                  + 
                                
                  /*complete days on first week, except the first run day * sum time per day */
                  COALESCE((select 
                    sum(time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))))
                  from 
                    user_profile_timeworks UP
                    join user_timeworks ut on ut.user_profile_time_work_id = up.id
                  where
                    up.user_id = new.user_id
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(new.last_run) > 0 
                      or DATEDIFF(utc_timestamp,new.last_run) <= 7
                    )
                    and ut.week_day > weekday(new.last_run)
                    AND datediff(utc_timestamp,date_add(new.last_run,interval(ut.week_day - weekday(new.last_run)) day)) > 0
                  ),0)
                  + 
                                
                  /*complete days on last week, except the last run day * sum time per day */
                  COALESCE((select 
                    sum(time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))))
                  from 
                    user_profile_timeworks UP
                    join user_timeworks ut on ut.user_profile_time_work_id = up.id
                  where
                    up.user_id = new.user_id
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(utc_timestamp) < 6 
                      or DATEDIFF(utc_timestamp,new.last_run) <= 7
                    )
                    and ut.week_day < weekday(utc_timestamp)
                    AND datediff(new.last_run,date_add(utc_timestamp,interval((weekday(utc_timestamp) - ut.week_day) * -1) day)) < 0                               
                  ),0)
                  + 
                                
                  /*time of first day run */
                  coalesce((select 
                    sum(coalesce(
                      time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))) 
                        - case 
                          when time_to_sec(date_format(DATE_ADD(new.last_run,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) <= time_to_sec(coalesce(ut.start_at,0)) then 
                            0 + case when datediff(new.last_run,utc_timestamp) = 0 then
                                case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) > time_to_sec(coalesce(ut.start_at,0)) then 
                                  case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) < time_to_sec(coalesce(ut.end_at,0)) then
                                    time_to_sec(coalesce(ut.end_at,0)) - time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) 
                                  else 0
                                  end
                                else time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))) 
                                end
                              else 0
                            end
                          when time_to_sec(date_format(DATE_ADD(new.last_run,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) < time_to_sec(coalesce(ut.end_at,0)) then 
                            (time_to_sec(date_format(DATE_ADD(new.last_run,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) - time_to_sec(coalesce(ut.start_at,0))) 
                              + case when datediff(new.last_run,utc_timestamp) = 0 then
                                case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) > time_to_sec(coalesce(ut.start_at,0)) then 
                                  case when time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) < time_to_sec(coalesce(ut.end_at,0)) then
                                    time_to_sec(coalesce(ut.end_at,0)) - time_to_sec(date_format(DATE_ADD(utc_timestamp,INTERVAL(coalesce(u.last_timezone_offset,0)) SECOND),'%H:%i:%s')) 
                                  else 0
                                  end
                                else time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))) 
                                end
                              else 0
                            end
                          else 
                            time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))) 
                      end
                    ,0))
                  from
                    user_profile_timeworks UP
                    join users u on u.id = up.user_id
                    join user_timeworks ut on ut.user_profile_time_work_id = up.id
                  where
                    up.user_id = new.user_id
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(new.last_run) > 0 
                      or DATEDIFF(utc_timestamp,new.last_run) <= 7
                    )
                    and ut.week_day = weekday(new.last_run)
                  ),0)
                  + 
                                
                  /*time of last day run */
                  coalesce((select
                    sum(coalesce(
                      time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))) 
                        - case 
                          when time_to_sec(date_format(date_add(utc_timestamp,interval(coalesce(u.last_timezone_offset,0)) second),'%H:%i:%s')) >= time_to_sec(coalesce(ut.end_at,0)) then 
                            0
                          when time_to_sec(date_format(date_add(utc_timestamp,interval(coalesce(u.last_timezone_offset,0)) second),'%H:%i:%s')) > time_to_sec(coalesce(ut.start_at,0)) then 
                            time_to_sec(coalesce(ut.end_at,0)) - time_to_sec(date_format(date_add(utc_timestamp,interval(coalesce(u.last_timezone_offset,0)) second),'%H:%i:%s'))
                          else 
                            time_to_sec(timediff(coalesce(ut.end_at,0),coalesce(ut.start_at,0))) 
                      end
                    ,0)) as tot
                  from
                    user_profile_timeworks UP
                    join users u on u.id = up.user_id
                    join user_timeworks ut on ut.user_profile_time_work_id = up.id
                  where 
                    up.user_id = new.user_id
                    and up.name = 'DEFAULT'
                    AND (
                      weekday(utc_timestamp) < 6 
                      or DATEDIFF(utc_timestamp,new.last_run) <= 7
                    )
                    and ut.week_day = weekday(utc_timestamp)
                    and datediff(new.last_run,utc_timestamp) <> 0
                  ),0)						
              ),0)
                    ELSE 
              TIMESTAMPDIFF(
                SECOND, 
                coalesce(
                new.last_run,
                (SELECT MAX(T2.created_at) FROM tasks_status_users_logs T2 WHERE T2.task_status_user_id = new.id AND T2.new_status_id=2),
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
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS TRG_TIMETASKTRACKER`);
  }
};