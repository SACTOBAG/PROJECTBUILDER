@echo off
setlocal enabledelayedexpansion

REM ============================================================
REM Brew Master — Smoke Test Script (Windows)
REM Exercises >=4 endpoints (3 GET + 1 POST write)
REM Reads BASE_URL from env (default http://localhost:3001)
REM Exits non-zero on failure
REM ============================================================

if "%BASE_URL%"=="" set BASE_URL=http://localhost:3001

set PASS=0
set FAIL=0
set USER_ID=a1000000-0000-0000-0000-000000000001

echo.
echo ========================================
echo   Brew Master Smoke Tests
echo   BASE_URL = %BASE_URL%
echo ========================================
echo.

REM --- Test 1: Health check (GET) ---
echo [TEST 1] GET /api/health
curl -s -o nul -w "%%{http_code}" %BASE_URL%/api/health > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="200" (
    echo   PASS ^(200^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Test 2: List brews (GET) ---
echo [TEST 2] GET /api/brews
curl -s -o nul -w "%%{http_code}" "%BASE_URL%/api/brews?user_id=%USER_ID%" > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="200" (
    echo   PASS ^(200^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Test 3: List recipes (GET) ---
echo [TEST 3] GET /api/recipes
curl -s -o nul -w "%%{http_code}" %BASE_URL%/api/recipes > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="200" (
    echo   PASS ^(200^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Test 4: List ingredients (GET) ---
echo [TEST 4] GET /api/ingredients
curl -s -o nul -w "%%{http_code}" %BASE_URL%/api/ingredients > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="200" (
    echo   PASS ^(200^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Test 5: Create brew (POST — write) ---
echo [TEST 5] POST /api/brews ^(create^)
curl -s -o nul -w "%%{http_code}" -X POST %BASE_URL%/api/brews -H "Content-Type: application/json" -d "{\"user_id\":\"%USER_ID%\",\"grind_size\":\"medium\",\"bean_type\":\"Test Bean\",\"water_temp_f\":200,\"duration\":180}" > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="201" (
    echo   PASS ^(201^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Test 6: Create brew validation (POST — 400) ---
echo [TEST 6] POST /api/brews missing required fields ^(expect 400^)
curl -s -o nul -w "%%{http_code}" -X POST %BASE_URL%/api/brews -H "Content-Type: application/json" -d "{}" > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="400" (
    echo   PASS ^(400^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Test 7: Get pantry (GET) ---
echo [TEST 7] GET /api/pantry
curl -s -o nul -w "%%{http_code}" "%BASE_URL%/api/pantry?user_id=%USER_ID%" > %TEMP%\smoke_code.txt
set /p CODE=<%TEMP%\smoke_code.txt
if "%CODE%"=="200" (
    echo   PASS ^(200^)
    set /a PASS+=1
) else (
    echo   FAIL ^(got %CODE%^)
    set /a FAIL+=1
)
echo.

REM --- Summary ---
echo ========================================
echo   Results: %PASS% passed, %FAIL% failed
echo ========================================

if %FAIL% GTR 0 (
    exit /b 1
)
exit /b 0
