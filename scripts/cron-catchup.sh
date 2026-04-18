#!/bin/bash
# cron-catchup.sh — Verifica se o cron principal rodou hoje e executa se necessário
# Roda a cada hora via crontab como fallback para jobs perdidos (ex: Mac dormindo)
# Cron: 0 * * * * /Users/diegodmacedo/Documents/hair-loss-br/scripts/cron-catchup.sh

set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$PROJECT_DIR/logs"
DATA_BRT=$(TZ="America/Sao_Paulo" date +%Y-%m-%d)
HORA_BRT=$(TZ="America/Sao_Paulo" date +%H)
DIA_MES=$(TZ="America/Sao_Paulo" date +%-d)

# Só roda em dias ímpares (mesmo padrão do */2 no crontab)
if (( DIA_MES % 2 == 0 )); then
  exit 0
fi

# Só roda entre 10h e 22h BRT (janela permitida)
if (( HORA_BRT < 10 || HORA_BRT > 22 )); then
  exit 0
fi

# Verifica se já rodou hoje (procura log do dia com "CRON END")
if ls "$LOG_DIR"/cron-${DATA_BRT}-*.log 1>/dev/null 2>&1; then
  for logfile in "$LOG_DIR"/cron-${DATA_BRT}-*.log; do
    if grep -q "CRON END" "$logfile" 2>/dev/null; then
      # Já rodou com sucesso hoje — nada a fazer
      exit 0
    fi
  done
fi

# Não rodou hoje — executar o cron principal
echo "[$(TZ='America/Sao_Paulo' date '+%Y-%m-%d %H:%M:%S')] CATCHUP: cron principal não rodou hoje, executando agora..." >> "$LOG_DIR/catchup.log"
exec "$PROJECT_DIR/scripts/cron-agent.sh"
