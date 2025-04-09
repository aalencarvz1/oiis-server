'use strict';

import { QueryInterface } from "sequelize";


/** @type {import('sequelize-cli').Migration} */

/*migration*/
export default {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.sequelize.query(`DROP PROCEDURE IF EXISTS migration_check`);
    await queryInterface.sequelize.query(`
CREATE PROCEDURE migration_check(
    IN previous_db VARCHAR(64),
    IN current_db VARCHAR(64)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE tabela_nome VARCHAR(64);
    DECLARE sql_count_previous TEXT;
    DECLARE sql_count_current TEXT;
    DECLARE total_previous BIGINT;
    DECLARE total_current BIGINT;

    -- Cursor com todas as tabelas do banco atual
    DECLARE cur CURSOR FOR
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = current_db
          AND table_type = 'BASE TABLE';

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
	SELECT 'init migration check';
    loop_tabelas: LOOP
        FETCH cur INTO tabela_nome;
        IF done THEN
            LEAVE loop_tabelas;
        END IF;

        -- Monta dinamicamente a contagem de linhas da tabela no banco anterior
        SET @sql_count_previous = CONCAT('SELECT COUNT(*) INTO @total_previous FROM ', previous_db, '.', tabela_nome);
        SET @sql_count_current = CONCAT('SELECT COUNT(*) INTO @total_current FROM ', current_db, '.', tabela_nome);

        -- Executa e captura os valores
        PREPARE stmt FROM @sql_count_previous;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        PREPARE stmt FROM @sql_count_current;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        -- Compara e exibe diferenças
        IF @total_previous != @total_current THEN
            SELECT CONCAT('Table ', tabela_nome, ': difference lines count -> previous_db = ', @total_previous, ', current_db = ', @total_current) AS resultado;
        END IF;

    END LOOP;

    CLOSE cur;
    SELECT 'end migration check';
END`);

      //to use: call migration_check('previous_db_name','current_db_name');

  },
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS TRG_TIMETASKTRACKER`);
  }
};