export default [       
    {
        "id" : 1,
        "name" :"HOME",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z\"/></svg>",
        "numeric_order":1,
        "path" :"/"
    },
    {              
        "id" : 2,
        "name" :"REGISTERS",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-440h240v-160H200v160Zm0-240h560v-80H200v80Zm0 560q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v252q-19-8-39.5-10.5t-40.5.5q-21 4-40.5 13.5T684-479l-39 39-205 204v116H200Zm0-80h240v-160H200v160Zm320-240h125l39-39q16-16 35.5-25.5T760-518v-82H520v160Zm0 360v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-300L643-80H520Zm300-263-37-37 37 37ZM580-140h38l121-122-37-37-122 121v38Zm141-141-19-18 37 37-18-19Z\"/></svg>",
        "numeric_order":2,
        "subs":[{
            "id" :200,
            "name" :"DATABASES",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z\"/></svg>",
            "numeric_order":200,
            "subs":[{
                "id" :20000,
                "routine_type_id" : 1,
                "name" :"DATABASES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z\"/></svg>",
                "view_path" :"/views/modules/registers/databases/databases",
                "numeric_order":20000
            },{
                "id" :20001,
                "routine_type_id" : 1,
                "name" :"SCHEMAS",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-40v-240h100v-80H160v-240h100v-80H160v-240h280v240H340v80h100v80h120v-80h280v240H560v-80H440v80H340v80h100v240H160Zm80-80h120v-80H240v80Zm0-320h120v-80H240v80Zm400 0h120v-80H640v80ZM240-760h120v-80H240v80Zm60-40Zm0 320Zm400 0ZM300-160Z\"/></svg>",
                "view_path" :"/views/modules/registers/databases/schemas",
                "numeric_order":20001
            },{
                "id" :20002,
                "routine_type_id" : 1,
                "name" :"USERS",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M680-119q-8 0-16-2t-15-7l-120-70q-14-8-21.5-21.5T500-249v-141q0-16 7.5-29.5T529-441l120-70q7-5 15-7t16-2q8 0 15.5 2.5T710-511l120 70q14 8 22 21.5t8 29.5v141q0 16-8 29.5T830-198l-120 70q-7 4-14.5 6.5T680-119ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm320-400q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Zm174-166 94 55 94-55-94-54-94 54Zm124 208 90-52v-110l-90 53v109Zm-150-52 90 53v-109l-90-53v109Z\"/></svg>",
                "view_path" :"/views/modules/registers/databases/users",
                "numeric_order":20002
            },{
                "id" :20003,
                "routine_type_id" : 1,
                "name" :"CONNECTIONS",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z\"/></svg>",
                "view_path" :"/views/modules/registers/databases/connections",
                "numeric_order":20003
            },{
                "id" :20004,
                "routine_type_id" : 1,
                "name" :"TABLES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm240-240H200v160h240v-160Zm80 0v160h240v-160H520Zm-80-80v-160H200v160h240Zm80 0h240v-160H520v160ZM200-680h560v-80H200v80Z\"/></svg>",
                "view_path" :"/views/modules/registers/databases/tables",
                "numeric_order":20004
            },{
                "id" :20005,
                "routine_type_id" : 1,
                "name" :"ENTITIES TYPES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v333q-19-11-39-20t-41-16v-137H520v137q-46 14-86 40t-74 63H200v160h82q11 22 22 42t24 38H200Zm0-320h240v-160H200v160Zm0-240h560v-80H200v80Zm280 200Zm0 0Zm0 0Zm0 0ZM640-40q-91 0-168-48T360-220q35-84 112-132t168-48q91 0 168 48t112 132q-35 84-112 132T640-40Zm0-80q57 0 107.5-26t82.5-74q-32-48-82.5-74T640-320q-57 0-107.5 26T450-220q32 48 82.5 74T640-120Zm0-40q-25 0-42.5-17.5T580-220q0-25 17.5-42.5T640-280q25 0 42.5 17.5T700-220q0 25-17.5 42.5T640-160Z\"/></svg>",
                "view_path" :"/views/modules/registers/databases/entities_types",
                "numeric_order":20005
            }]
        },{      
            "id" :205,
            "routine_type_id" : 1,
            "name" :"PARAMETERS",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z\"/></svg>",
            "view_path" :"/views/modules/registers/parameters",
            "numeric_order":205
        },{ 
            "id" :215,
            "name" :"LOCATIONS",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z\"/></svg>",
            "numeric_order":215,
            "subs":[{
                "id" : 21502,
                "routine_type_id" : 1,
                "name" : "CONTINENTS",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80-28-28q-6-6-9-13t-3-15v-224q-33 0-56.5-23.5T360-520v-40L235-685q-35 42-55 94t-20 111q0 134 93 227t227 93Zm40-2q119-15 199.5-105T800-480q0-133-93.5-226.5T480-800q-44 0-84.5 11.5T320-757v77h142q18 0 34.5 8t27.5 22l56 70h60q17 0 28.5 11.5T680-540v42q0 9-2.5 17t-7.5 16L520-240v78Z\"/></svg>",
                "view_path" : "/views/modules/registers/locations/continents",
                "numeric_order":21502
            },{
                "id" : 21503,
                "routine_type_id" : 1,
                "name" : "COUNTRIES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-80v-760h640l-80 200 80 200H280v360h-80Zm80-440h442l-48-120 48-120H280v240Zm0 0v-240 240Z\"/></svg>",
                "view_path" : "/views/modules/registers/locations/countries",
                "numeric_order":21503,
                "subs":[{
                    "id" : 2150300,
                    "routine_type_id" : 1,
                    "name" : "COUNTRIES INTEGRATIONS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-80v-760h640l-80 200 80 200H280v360h-80Zm80-440h442l-48-120 48-120H280v240Zm0 0v-240 240Z\"/></svg>",
                    "view_path" : "/views/modules/registers/locations/countries/integrations",
                    "numeric_order":2150300,
                    "show_in_menu":0
                    
                }]    
            },{
                "id" : 21505,
                "routine_type_id" : 1,
                "name" : "STATES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z\"/></svg>",
                "view_path" : "/views/modules/registers/locations/states",
                "numeric_order":21505,
                "subs":[{
                    "id" : 2150500,
                    "routine_type_id" : 1,
                    "name" : "STATES INTEGRATIONS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z\"/></svg>",
                    "view_path" : "/views/modules/registers/locations/states/integrations",
                    "numeric_order":2150500,
                    "show_in_menu":0
                }]
            },{
                "id" : 21508,
                "routine_type_id" : 1,
                "name" : "CITIES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z\"/></svg>",
                "view_path" : "/views/modules/registers/locations/cities",
                "numeric_order":21508,
                "subs":[{
                    "id" : 2150800,
                    "routine_type_id" : 1,
                    "name" : "CITIES INTEGRATIONS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M120-120v-560h240v-80l120-120 120 120v240h240v400H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm240 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z\"/></svg>",
                    "view_path" : "/views/modules/registers/locations/cities/integrations",
                    "numeric_order":2150800,
                    "show_in_menu":0
                }]
            }]
        },{ 
            "id" :220,
            "name" :"PEOPLE",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z\"/></svg>",
            "numeric_order":220,
            "subs":[{
                "id" : 22000,
                "routine_type_id" : 1,
                "name" : "PEOPLE",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z\"/></svg>",
                "view_path" : "/views/modules/registers/people/people",
                "numeric_order":22000,
                "subs":[{
                    "id" : 2200000,
                    "routine_type_id" : 1,
                    "name" : "PEOPLE INTEGRATIONS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/people/integrations",
                    "numeric_order":2200000,
                    "show_in_menu" : 0
                }]
            },{
                "id" : 22001,
                "routine_type_id" : 1,
                "name" : "COMPANIES",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M80-80v-481l280-119v80l200-80v120h320v480H80Zm80-80h640v-320H480v-82l-200 80v-78l-120 53v347Zm280-80h80v-160h-80v160Zm-160 0h80v-160h-80v160Zm320 0h80v-160h-80v160Zm280-320H680l40-320h120l40 320ZM160-160h640-640Z\"/></svg>",
                "view_path" : "/views/modules/registers/people/companies",
                "numeric_order":22001,
                "subs":[{
                    "id" : 2200100,
                    "routine_type_id" : 1,
                    "name" : "COMPANIES INTEGRATIONS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M80-80v-481l280-119v80l200-80v120h320v480H80Zm80-80h640v-320H480v-82l-200 80v-78l-120 53v347Zm280-80h80v-160h-80v160Zm-160 0h80v-160h-80v160Zm320 0h80v-160h-80v160Zm280-320H680l40-320h120l40 320ZM160-160h640-640Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/companies/integrations",
                    "numeric_order":2200100,
                    "show_in_menu" : 0
                }]
            },{
                "id" : 22002,
                "routine_type_id" : 1,
                "name" : "WAREHOUSES",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-200h80v-320h480v320h80v-426L480-754 160-626v426Zm-80 80v-560l400-160 400 160v560H640v-320H320v320H80Zm280 0v-80h80v80h-80Zm80-120v-80h80v80h-80Zm80 120v-80h80v80h-80ZM240-520h480-480Z\"/></svg>",
                "view_path" : "/views/modules/registers/people/warehouses",
                "numeric_order":22002,
                "subs":[{
                    "id" : 2200200,
                    "routine_type_id" : 1,
                    "name" : "WAREHOUSES INTEGRATIONS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-200h80v-320h480v320h80v-426L480-754 160-626v426Zm-80 80v-560l400-160 400 160v560H640v-320H320v320H80Zm280 0v-80h80v80h-80Zm80-120v-80h80v80h-80Zm80 120v-80h80v80h-80ZM240-520h480-480Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/warehouses/integrations",
                    "numeric_order":2200200,
                    "show_in_menu" : 0
                }]
            },{
                "id" : 22003,
                "routine_type_id" : 1,
                "name" : "BUSINESSES UNITS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z\"/></svg>",
                "view_path" : "/views/modules/registers/people/business_units",
                "numeric_order":22003,
                "subs":[{
                    "id" : 2200300,
                    "routine_type_id" : 1,
                    "name" : "BUSINESSES UNITS INTEGRATIONS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/business_units/integrations",
                    "numeric_order":2200300,
                    "show_in_menu" : 0
                }]
            },{
                "id" : 22010,
                "name" : "USERS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-240q-56 0-107 17.5T280-170v10h400v-10q-42-35-93-52.5T480-240Zm0-80q69 0 129 21t111 59v-560H240v560q51-38 111-59t129-21Zm0-160q-25 0-42.5-17.5T420-540q0-25 17.5-42.5T480-600q25 0 42.5 17.5T540-540q0 25-17.5 42.5T480-480ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm240-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-140Z\"/></svg>",
                "numeric_order":22010,
                "subs":[{
                    "id" : 2201000,
                    "routine_type_id" : 1,
                    "name" : "USERS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-240q-56 0-107 17.5T280-170v10h400v-10q-42-35-93-52.5T480-240Zm0-80q69 0 129 21t111 59v-560H240v560q51-38 111-59t129-21Zm0-160q-25 0-42.5-17.5T420-540q0-25 17.5-42.5T480-600q25 0 42.5 17.5T540-540q0 25-17.5 42.5T480-480ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm240-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-140Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/users/users",
                    "numeric_order":2201000
                },{
                    "id" : 2201001,
                    "routine_type_id" : 1,
                    "name" : "ACCESSES PROFILES",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-240v-480 172-12 320Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v131q-18-13-38-22.5T800-548v-92H447l-80-80H160v480h283q3 21 9.5 41t15.5 39H160Zm400 0v-22q0-45 44-71.5T720-280q72 0 116 26.5t44 71.5v22H560Zm160-160q-33 0-56.5-23.5T640-400q0-33 23.5-56.5T720-480q33 0 56.5 23.5T800-400q0 33-23.5 56.5T720-320Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/users/access_profiles",
                    "numeric_order":2201001
                },{
                    "id" : 2201002,
                    "routine_type_id" : 1,
                    "name" : "PERMISSIONS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z\"/></svg>",
                    "view_path" : "/views/modules/registers/people/users/permissions",
                    "numeric_order":2201002
                }]
            },{
                "id" : 22013,
                "routine_type_id" : 1,
                "name" : "CLIENTS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z\"/></svg>",
                "view_path" : "/views/modules/registers/people/clients",
                "numeric_order":22013,
                "subs":[{
                    "id" : 2201300,
                    "routine_type_id" : 1,
                    "name" : "CLIENTS MAP",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z\"/></svg>",
                    "view_path" :"/views/modules/registers/people/clients/map",
                    "numeric_order":2201300,
                    "show_in_menu":0
                }]                
            }]
        },{ 
            "id" :230,
            "name" :"ITEMS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z\"/></svg>",
            "numeric_order":230,
            "subs":[{
                "id" : 23000,
                "routine_type_id" : 1,
                "name" : "ITEMS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z\"/></svg>",
                "view_path" : "/views/modules/registers/items/items",
                "numeric_order":23000,
            },{
                "id" : 23001,
                "routine_type_id" : 1,
                "name" : "NCMS",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z\"/></svg>",
                "view_path" : "/views/modules/registers/items/ncms",
                "numeric_order":23001,
            }]
        },{
            "id" : 245,
            "routine_type_id" : 1,
            "name" : "GROUPS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M320-320q33 0 56.5-23.5T400-400q0-33-23.5-56.5T320-480q-33 0-56.5 23.5T240-400q0 33 23.5 56.5T320-320Zm320 0q33 0 56.5-23.5T720-400q0-33-23.5-56.5T640-480q-33 0-56.5 23.5T560-400q0 33 23.5 56.5T640-320ZM480-560q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 480q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z\"/></svg>",
            "view_path" :"/views/modules/registers/groups",
            "numeric_order":245,
            "subs":[{
                "id" : 24500,
                "routine_type_id" : 1,
                "name" : "GROUP ITEMS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z\"/></svg>",
                "view_path" :"/views/modules/registers/groups/:group_id/group_items",
                "numeric_order":24500,
                "show_in_menu":0
            }] 
        },{
            "id" : 250,
            "routine_type_id" : 1,
            "name" : "OBJECTIVES",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm80-160h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160Zm80-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM480-480Z\"/></svg>",
            "view_path" :"/views/modules/registers/objectives",
            "numeric_order":250
        },{
            "id" : 255,
            "name" : "REPORTS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m296-80-56-56 276-277 140 140 207-207 57 57-264 263-140-140L296-80Zm-136-40q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h560q33 0 56.5 23.5T800-760v168H160v472Zm0-552h560v-88H160v88Zm0 0v-88 88Z\"/></svg>",
            "numeric_order":255,
            "subs":[{
                "id" : 25500,
                "routine_type_id" : 1,
                "name" : "REPORTS DATAS FOUNTS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M472-120q-73-1-137.5-13.5t-112-34Q175-189 147.5-218T120-280q0 33 27.5 62t75 50.5q47.5 21.5 112 34T472-120Zm-71-204q-30-3-58-8t-53.5-12q-25.5-7-48-15.5T200-379q19 11 41.5 19.5t48 15.5q25.5 7 53.5 12t58 8Zm79-275q86 0 177.5-26T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q15 29 104.5 54.5T480-599Zm-61 396q10 23 23 44t30 39q-73-1-137.5-13.5t-112-34Q175-189 147.5-218T120-280v-400q0-33 28.5-62t77.5-51q49-22 114.5-34.5T480-840q74 0 139.5 12.5T734-793q49 22 77.5 51t28.5 62q0 33-28.5 62T734-567q-49 22-114.5 34.5T480-520q-85 0-157-15t-123-44v101q40 37 100 54t121 22q-8 15-13 34.5t-7 43.5q-60-7-111.5-20T200-379v99q14 25 77 47t142 30ZM864-40 756-148q-22 13-46 20.5t-50 7.5q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7.5 50T812-204L920-96l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z\"/></svg>",
                "view_path" :"/views/modules/registers/reports/datas",
                "numeric_order":25500
            },{
                "id" : 25501,
                "routine_type_id" : 1,
                "name" : "REPORTS VISIONS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v333q-19-11-39-20t-41-16v-137H520v137q-46 14-86 40t-74 63H200v160h82q11 22 22 42t24 38H200Zm0-320h240v-160H200v160Zm0-240h560v-80H200v80Zm280 200Zm0 0Zm0 0Zm0 0ZM640-40q-91 0-168-48T360-220q35-84 112-132t168-48q91 0 168 48t112 132q-35 84-112 132T640-40Zm0-80q57 0 107.5-26t82.5-74q-32-48-82.5-74T640-320q-57 0-107.5 26T450-220q32 48 82.5 74T640-120Zm0-40q-25 0-42.5-17.5T580-220q0-25 17.5-42.5T640-280q25 0 42.5 17.5T700-220q0 25-17.5 42.5T640-160Z\"/></svg>",
                "view_path" :"/views/modules/registers/reports/visions",
                "numeric_order":25599
            },{
                "id" : 25502,
                "name" : "CAMPAIGNS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z\"/></svg>",
                "numeric_order":25502,
                "subs":[{
                    "id" : 2550200,
                    "routine_type_id": 1,
                    "name" : "CUSTOMIZED CAMPAIGNS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-120v-720h640v400H240v80h200v80H240v80h200v80H160Zm456 0L504-232l56-56 56 56 142-142 56 56-198 198ZM240-520h200v-80H240v80Zm280 0h200v-80H520v80ZM240-680h200v-80H240v80Zm280 0h200v-80H520v80Z\"/></svg>",
                    "view_path" :"/views/modules/registers/reports/campaigns/customized_campaigns",
                    "numeric_order":2550200,
                    "subs":[{
                        "id" : 255020000,
                        "routine_type_id" : 1,
                        "name" : "MANEGEMENT CAMPAIGN",
                        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q10 0 19.5.5T520-877v81q-10-2-20-3t-20-1q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-2-.5-4t-.5-4h80q0 2 .5 4t.5 4q0 100-79.5 217.5T480-80Zm0-450Zm195-108 84-84 84 84 56-56-84-84 84-84-56-56-84 84-84-84-56 56 84 84-84 84 56 56ZM480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z\"/></svg>",
                        "view_path" :"/views/modules/registers/reports/campaigns/customized_campaigns/manegement/:campaign_id",
                        "numeric_order":255020000,
                        "show_in_menu":0,
                        "subs":[{
                                "id" : 25502000000,
                                "routine_type_id" : 1,
                                "name" : "KPI CAMPAIGN",
                                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q10 0 19.5.5T520-877v81q-10-2-20-3t-20-1q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-2-.5-4t-.5-4h80q0 2 .5 4t.5 4q0 100-79.5 217.5T480-80Zm0-450Zm195-108 84-84 84 84 56-56-84-84 84-84-56-56-84 84-84-84-56 56 84 84-84 84 56 56ZM480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z\"/></svg>",
                                "view_path" :"/views/modules/registers/reports/campaigns/customized_campaigns/manegement/:campaign_id/kpis/manegement/:kpi_id",
                                "numeric_order":25502000000,
                                "show_in_menu":0
                            }]
                    }]
                }]
            }]
        },{
            "id" : 258,
            "name" : "LOGISTIC",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z\"/></svg>",
            "numeric_order":258,
            "subs" : [{
                "id" : 25800,
                "routine_type_id" : 1,
                "name" : "LOGISTIC REASONS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q10 0 19.5.5T520-877v81q-10-2-20-3t-20-1q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-2-.5-4t-.5-4h80q0 2 .5 4t.5 4q0 100-79.5 217.5T480-80Zm0-450Zm195-108 84-84 84 84 56-56-84-84 84-84-56-56-84 84-84-84-56 56 84 84-84 84 56 56ZM480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z\"/></svg>",
                "view_path" :"/views/modules/registers/logistic/reasons",
                "numeric_order":25800,
                "subs":[{
                    "id" : 2580000,
                    "routine_type_id" : 1,
                    "name" : "LOGISTIC REASONS INTEGRATIONS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q10 0 19.5.5T520-877v81q-10-2-20-3t-20-1q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186q122-112 181-203.5T720-552q0-2-.5-4t-.5-4h80q0 2 .5 4t.5 4q0 100-79.5 217.5T480-80Zm0-450Zm195-108 84-84 84 84 56-56-84-84 84-84-56-56-84 84-84-84-56 56 84 84-84 84 56 56ZM480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Z\"/></svg>",
                    "view_path" :"/views/modules/registers/logistic/reasons/integrations",
                    "numeric_order":2580000,
                    "show_in_menu":0
                }]
            }]
        },{
            "id" : 260,
            "routine_type_id" : 1,
            "name" : "APIS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z\"/></svg>",
            "view_path" :"/views/modules/registers/apis/apis",
            "numeric_order":260
        },{
            "id" : 280,
            "name" : "SQL",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z\"/></svg>",
            "numeric_order":280,
            "subs":[{
                "id" : 28000,
                "routine_type_id" : 1,
                "name" : "SQL PROCESSES",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M467-120q-73-1-136-14t-110-34.5q-47-21.5-74-50T120-280q0 33 27 61.5t74 50Q268-147 331-134t136 14Zm-15-200q-38-2-73.5-6.5t-67.5-12q-32-7.5-60-17.5t-51-23q23 13 51 23t60 17.5q32 7.5 67.5 12T452-320Zm28-279q89 0 179-26.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 27 101.5 53.5T480-599Zm220 479h40v-164l72 72 28-28-120-120-120 120 28 28 72-72v164Zm20 80q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM443-201q3 22 9 42t15 39q-73-1-136-14t-110-34.5q-47-21.5-74-50T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v187q-19-9-39-15t-41-9v-62q-52 29-124 44t-156 15q-85 0-157-15t-123-44v101q51 47 130.5 62.5T480-400h11q-13 18-22.5 38T452-320q-76-4-141-18.5T200-379v99q7 13 30 26.5t56 24q33 10.5 73.5 18T443-201Z\"/></svg>",
                "view_path" :"/views/modules/registers/sql_processes",
                "numeric_order":28000
            }]
        },{
            "id" : 295,
            "name" : "EXTERNAL DATAS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentData\"><path d=\"M160-120q-50 0-85-35t-35-85q0-50 35-85t85-35q9 0 17.5 1.5T194-355l162-223q-17-21-26.5-47t-9.5-55q0-66 47-113t113-47q66 0 113 47t47 113q0 29-10 55t-27 47l163 223q8-2 16.5-3.5T800-360q50 0 85 35t35 85q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-19 5.5-36.5T701-308L539-531q-5 2-9.5 3t-9.5 3v172q35 12 57.5 43t22.5 70q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-39 22.5-69.5T440-353v-172q-5-2-9.5-3t-9.5-3L259-308q10 14 15.5 31.5T280-240q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T200-240q0-17-11.5-28.5T160-280q-17 0-28.5 11.5T120-240q0 17 11.5 28.5T160-200Zm320-480Zm0 480q17 0 28.5-11.5T520-240q0-17-11.5-28.5T480-280q-17 0-28.5 11.5T440-240q0 17 11.5 28.5T480-200Zm320 0q17 0 28.5-11.5T840-240q0-17-11.5-28.5T800-280q-17 0-28.5 11.5T760-240q0 17 11.5 28.5T800-200Zm-640-40Zm320 0Zm320 0ZM480-600q33 0 56.5-23.5T560-680q0-33-23.5-56.5T480-760q-33 0-56.5 23.5T400-680q0 33 23.5 56.5T480-600Z\"/></svg>",
            "numeric_order":295,
            "subs":[{
                "id" : 29500,
                "routine_type_id" : 1,
                "name" : "RFB",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm179-80h442L480-830 259-720ZM80-120v-80h482q2 21 5 40.5t9 39.5H80Zm600-310v-130h80v90l-80 40ZM800 0q-69-17-114.5-79.5T640-218v-102l160-80 160 80v102q0 76-45.5 138.5T800 0Zm-29-120 139-138-42-42-97 95-39-39-42 43 81 81ZM259-720h442-442Z\"/></svg>",
                "view_path" :"/views/modules/registers/external_datas/rfb",
                "numeric_order":29500
            }]
        },{
            "id" : 296,
            "routine_type_id" : 1,
            "name" : "LISTS NAMES",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z\"/></svg>",
            "view_path" :"/views/modules/registers/lists_names",
            "numeric_order":296
        },{
            "id" : 297,
            "routine_type_id" : 1,
            "name" : "CONDITIONS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z\"/></svg>",
            "view_path" :"/views/modules/registers/conditions",
            "numeric_order":297
        },{
            "id" : 298,
            "name" : "INTEGRATIONS",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z\"/></svg>",            
            "numeric_order":298,
            "subs":[{
                "id" : 29800,
                "name" : "WINTHOR",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z\"/></svg>",
                "numeric_order":29800,
                "subs":[{
                    "id" : 2980000,
                    "routine_type_id" : 1,
                    "name" : "RULES",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m576-160-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm79-360L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z\"/></svg>",
                    "view_path" :"/views/modules/registers/integrations/winthor/rules",
                    "numeric_order":2980000                    
                },{
                    "id" : 2980015,
                    "routine_type_id" : 1,
                    "name" : "PRODUCTS",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z\"/></svg>",
                    "view_path" :"/views/modules/registers/integrations/winthor/products",
                    "numeric_order":2980015,
                    "subs":[{
                        "id" : 298001500,
                        "routine_type_id" : 1,
                        "name" : "PRODUCT MANAGEMENT",
                        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z\"/></svg>",
                        "view_path" :"/views/modules/registers/integrations/winthor/products/management/:product_id",
                        "numeric_order":298001500,
                        "show_in_menu":0
                    },{
                        "id" : 298001501,
                        "routine_type_id" : 1,
                        "name" : "NAMES RULES",
                        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m576-160-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm79-360L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z\"/></svg>",
                        "view_path" :"/views/modules/registers/integrations/winthor/products/names_rules",
                        "numeric_order":298001501,
                    }]
                }]
            }]
        },{
            "id" : 299,
            "routine_type_id" : 1,
            "name" : "DATAS RELATIONSHIPS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M240-40q-50 0-85-35t-35-85q0-50 35-85t85-35q14 0 26 3t23 8l57-71q-28-31-39-70t-5-78l-81-27q-17 25-43 40t-58 15q-50 0-85-35T0-580q0-50 35-85t85-35q50 0 85 35t35 85v8l81 28q20-36 53.5-61t75.5-32v-87q-39-11-64.5-42.5T360-840q0-50 35-85t85-35q50 0 85 35t35 85q0 42-26 73.5T510-724v87q42 7 75.5 32t53.5 61l81-28v-8q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-32 0-58.5-15T739-515l-81 27q6 39-5 77.5T614-340l57 70q11-5 23-7.5t26-2.5q50 0 85 35t35 85q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-20 6.5-38.5T624-232l-57-71q-41 23-87.5 23T392-303l-56 71q11 15 17.5 33.5T360-160q0 50-35 85t-85 35ZM120-540q17 0 28.5-11.5T160-580q0-17-11.5-28.5T120-620q-17 0-28.5 11.5T80-580q0 17 11.5 28.5T120-540Zm120 420q17 0 28.5-11.5T280-160q0-17-11.5-28.5T240-200q-17 0-28.5 11.5T200-160q0 17 11.5 28.5T240-120Zm240-680q17 0 28.5-11.5T520-840q0-17-11.5-28.5T480-880q-17 0-28.5 11.5T440-840q0 17 11.5 28.5T480-800Zm0 440q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm240 240q17 0 28.5-11.5T760-160q0-17-11.5-28.5T720-200q-17 0-28.5 11.5T680-160q0 17 11.5 28.5T720-120Zm120-420q17 0 28.5-11.5T880-580q0-17-11.5-28.5T840-620q-17 0-28.5 11.5T800-580q0 17 11.5 28.5T840-540ZM480-840ZM120-580Zm360 120Zm360-120ZM240-160Zm480 0Z\"/></svg>",
            "view_path" :"/views/modules/registers/relationships",
            "numeric_order":299
        }]
    },{      
        "id" : 9,
        "name" :"STOCK",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z\"/></svg>",
        "numeric_order":9,
        "subs":[{
            "id" : 900,
            "routine_type_id" : 1,
            "name" :"THIRD PARTY STOCK",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M760-400v-260L560-800 360-660v60h-80v-100l280-200 280 200v300h-80ZM560-800Zm20 160h40v-40h-40v40Zm-80 0h40v-40h-40v40Zm80 80h40v-40h-40v40Zm-80 0h40v-40h-40v40ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z\"/></svg>",
            "view_path" :"/views/modules/stock/third_party_stock",
            "numeric_order":900
        }]
    },{      
        "id" : 10,
        "name" :"WMS",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-200h80v-320h480v320h80v-426L480-754 160-626v426Zm-80 80v-560l400-160 400 160v560H640v-320H320v320H80Zm280 0v-80h80v80h-80Zm80-120v-80h80v80h-80Zm80 120v-80h80v80h-80ZM240-520h480-480Z\"/></svg>",
        "numeric_order":10,
        "subs":[{      
            "id" :1001,
            "name" :"OUTPUTS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-160q-33 0-56.5-23.5T80-240v-280h80v280h640v-480H440v-80h360q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm523-140 57-57-124-123h104v-80H480v240h80v-103l123 123ZM80-600v-200h280v200H80Zm400 120Z\"/></svg>",
            "numeric_order":1001,
            "subs" : [{
                "id" : 100100,
                "routine_type_id" : 1,
                "name" :"SEPARATION MAP EMIT",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M360-240h440v-107H360v107ZM160-613h120v-107H160v107Zm0 187h120v-107H160v107Zm0 186h120v-107H160v107Zm200-186h440v-107H360v107Zm0-187h440v-107H360v107ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Z\"/></svg>",
                "view_path" :"/views/modules/wms/outputs/integrations/winthor/separation_map_emit",
                "numeric_order":100100
            },{
                "id" : 100101,
                "routine_type_id" : 1,
                "name" :"VARIABLE WEIGHT SEPARATION MAP EMIT",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M80-320v-80h80v80H80Zm0-160v-80h80v80H80Zm0-160v-80h80v80H80Zm160 320v-80h160v80H240Zm0-160v-80h520v80H240Zm0-160v-80h520v80H240Zm398 480L468-330l57-57 113 113 226-226 56 58-282 282Z\"/></svg>",
                "view_path" :"/views/modules/wms/outputs/integrations/winthor/variable_weight_separation_map_emit",
                "numeric_order":100101
            }]
        }]
    },{      
        "id" : 11,
        "name" : "MOVIMENTATIONS",
        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z\"/></svg>",
        "numeric_order":11,
        "subs":[{    
            "id" :1100,
            "name" : "INPUTS",            
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M80-520v-80h144L52-772l56-56 172 172v-144h80v280H80Zm80 360q-33 0-56.5-23.5T80-240v-200h80v200h320v80H160Zm640-280v-280H440v-80h360q33 0 56.5 23.5T880-720v280h-80ZM560-160v-200h320v200H560Z\"/></svg>",
            "numeric_order":1100,
            "subs":[{    
                "id" :110010,
                "routine_type_id" : 1,
                "name" : "PURCHASE SUGGESTION",            
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m40-240 20-80h220l-20 80H40Zm80-160 20-80h260l-20 80H120Zm623 240 20-160 29-240 10-79-59 479ZM240-80q-33 0-56.5-23.5T160-160h583l59-479H692l-11 85q-2 17-15 26.5t-30 7.5q-17-2-26.5-14.5T602-564l9-75H452l-11 84q-2 17-15 27t-30 8q-17-2-27-15t-8-30l9-74H220q4-34 26-57.5t54-23.5h80q8-75 51.5-117.5T550-880q64 0 106.5 47.5T698-720h102q36 1 60 28t19 63l-60 480q-4 30-26.5 49.5T740-80H240Zm220-640h159q1-33-22.5-56.5T540-800q-35 0-55.5 21.5T460-720Z\"/></svg>",
                "view_path" :"/views/modules/movimentations/inputs/purchase_suggestion",
                "numeric_order":110010
            },{    
                "id" :110020,
                "routine_type_id" : 1,
                "name" : "INPUT ANALISES",            
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m576-160-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm79-360L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z\"/></svg>",
                "view_path" :"/views/modules/movimentations/inputs/analises",
                "numeric_order":110020
            }]
        },{    
            "id" :1150,
            "routine_type_id" : 1,
            "name" : "OUTPUTS",            
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-160q-33 0-56.5-23.5T80-240v-280h80v280h640v-480H440v-80h360q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm523-140 57-57-124-123h104v-80H480v240h80v-103l123 123ZM80-600v-200h280v200H80Zm400 120Z\"/></svg>",
            "view_path" :"/views/modules/movimentations/outputs",
            "numeric_order":1150
        }]
    },{      
        "id" : 12,
        "name" : "LOGISTIC",
        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z\"/></svg>",
        "numeric_order":12,
        "subs":[{      
            "id" :1200,
            "routine_type_id" : 1,
            "name" : "DELIVERIES",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
            "view_path" :"/views/modules/logistic/deliveries",
            "numeric_order":1200,
            "subs":[{      
                "id" :120000,
                "routine_type_id" : 1,
                "name" : "DELIVERY",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
                "view_path" :"/views/modules/logistic/deliveries/:delivery",
                "numeric_order":120000,
                "show_in_menu":0,
                "subs":[{      
                    "id" :12000000,
                    "routine_type_id" : 1,
                    "name" : "INVOICES",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
                    "view_path" :"/views/modules/logistic/deliveries/:delivery/invoices",
                    "numeric_order":12000000,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" :1200000000,
                        "routine_type_id" : 1,
                        "name" : "INVOICE",
                        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
                        "view_path" :"/views/modules/logistic/deliveries/:delivery/invoices/:data_origin_id/:invoice",
                        "numeric_order":1200000000,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" :120000000000,
                            "routine_type_id" : 1,
                            "name" : "ITEMS",
                            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
                            "view_path" :"/views/modules/logistic/deliveries/:delivery/invoices/:data_origin_id/:invoice/items",
                            "numeric_order":120000000000,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" :12000000000000,
                                "routine_type_id" : 1,
                                "name" : "ITEM",
                                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
                                "view_path" :"/views/modules/logistic/deliveries/:delivery/invoices/:data_origin_id/:invoice/items/:item",
                                "numeric_order":12000000000000,
                                "show_in_menu":0
                            }]
                        }]
                    }]
                },{      
                    "id" :12000001,
                    "routine_type_id" : 1,
                    "name" : "ROUTE",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z\"/></svg>",
                    "view_path" :"/views/modules/logistic/deliveries/:delivery/route",
                    "numeric_order":12000001,
                    "show_in_menu":0
                }]
            }]
        }]
    },{      
        "id" : 50,
        "name" : "FINANCIAL",
        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z\"/></svg>",
        "numeric_order":4,
        "subs":[{      
            "id" : 5000,
            "name" : "BILLING",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M520-120v-80h184L520-384v-112l240 240v-184h80v320H520ZM240-280v-40H120v-80h240v-120H200q-33 0-56.5-23.5T120-600v-120q0-33 23.5-56.5T200-800h40v-40h80v40h120v80H200v120h160q33 0 56.5 23.5T440-520v120q0 33-23.5 56.5T360-320h-40v40h-80Z\"/></svg>",
            "numeric_order":5000,
            "subs":[{      
                "id" :500050,
                "name" : "PIX",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2em\" height=\"2em\" viewBox=\"0 0 16 16\" version=\"1.1\"><g id=\"surface1\"><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 12.128906 11.90625 C 11.546875 11.90625 11.003906 11.683594 10.59375 11.273438 L 8.386719 9.0625 C 8.234375 8.914062 7.960938 8.914062 7.808594 9.0625 L 5.589844 11.28125 C 5.183594 11.691406 4.640625 11.914062 4.058594 11.914062 L 3.625 11.914062 L 6.429688 14.71875 C 7.300781 15.589844 8.726562 15.589844 9.597656 14.71875 L 12.410156 11.90625 Z M 12.128906 11.90625 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 4.050781 4.085938 C 4.628906 4.085938 5.171875 4.308594 5.582031 4.71875 L 7.800781 6.9375 C 7.960938 7.097656 8.21875 7.097656 8.378906 6.9375 L 10.59375 4.726562 C 11.003906 4.316406 11.546875 4.09375 12.128906 4.09375 L 12.394531 4.09375 L 9.582031 1.28125 C 8.707031 0.410156 7.285156 0.410156 6.410156 1.28125 L 3.605469 4.085938 Z M 4.050781 4.085938 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 14.71875 6.417969 L 13.015625 4.71875 C 12.980469 4.738281 12.9375 4.746094 12.890625 4.746094 L 12.117188 4.746094 C 11.71875 4.746094 11.324219 4.90625 11.050781 5.191406 L 8.839844 7.398438 C 8.636719 7.601562 8.359375 7.710938 8.09375 7.710938 C 7.816406 7.710938 7.550781 7.601562 7.34375 7.398438 L 5.128906 5.183594 C 4.84375 4.898438 4.453125 4.738281 4.058594 4.738281 L 3.109375 4.738281 C 3.0625 4.738281 3.027344 4.726562 2.992188 4.710938 L 1.28125 6.417969 C 0.410156 7.292969 0.410156 8.714844 1.28125 9.589844 L 2.984375 11.289062 C 3.019531 11.273438 3.054688 11.261719 3.097656 11.261719 L 4.050781 11.261719 C 4.453125 11.261719 4.84375 11.101562 5.121094 10.816406 L 7.335938 8.601562 C 7.738281 8.199219 8.441406 8.199219 8.839844 8.601562 L 11.046875 10.808594 C 11.332031 11.09375 11.722656 11.253906 12.117188 11.253906 L 12.890625 11.253906 C 12.933594 11.253906 12.972656 11.261719 13.015625 11.28125 L 14.714844 9.582031 C 15.589844 8.707031 15.589844 7.292969 14.71875 6.417969 \"/></g></svg>",
                "numeric_order":500050,
                "subs" : [{
                    "id" : 50005090,
                    "name" :"INTEGRATIONS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z\"/></svg>",
                    "numeric_order":50005090,
                    "subs" : [{
                        "id" : 5000509000,
                        "name" :"SICREDI",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2em\" height=\"2em\" viewBox=\"0 0 15 15\" version=\"1.1\"><defs><filter id=\"alpha\" filterUnits=\"objectBoundingBox\" x=\"0%\" y=\"0%\" width=\"100%\" height=\"100%\"><feColorMatrix type=\"matrix\" in=\"SourceGraphic\" values=\"0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0\"/></filter><mask id=\"mask0\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip1\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface5\" clip-path=\"url(#clip1)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 7.183594 0 C 7.257812 0 7.332031 0 7.402344 0 C 7.648438 0.00390625 7.890625 0.0195312 8.132812 0.046875 C 8.191406 0.0507812 8.253906 0.0625 8.3125 0.0703125 C 8.84375 1.089844 9.207031 2.15625 9.402344 3.28125 C 9.480469 3.730469 9.519531 4.183594 9.523438 4.636719 C 9.523438 4.828125 9.503906 5.011719 9.464844 5.199219 C 9.441406 5.316406 9.390625 5.425781 9.316406 5.527344 C 9.210938 5.640625 9.089844 5.65625 8.953125 5.578125 C 8.894531 5.539062 8.839844 5.488281 8.792969 5.433594 C 8.769531 5.402344 8.746094 5.371094 8.722656 5.339844 C 8.390625 4.824219 8.039062 4.316406 7.667969 3.828125 C 7.492188 3.601562 7.316406 3.375 7.140625 3.148438 C 6.929688 2.902344 6.714844 2.652344 6.503906 2.40625 C 6.105469 1.953125 5.6875 1.511719 5.257812 1.082031 C 5.058594 0.882812 4.855469 0.683594 4.65625 0.484375 C 5.355469 0.21875 6.082031 0.0585938 6.835938 0.0117188 C 6.953125 0.0078125 7.070312 0 7.183594 0 Z M 7.183594 0 \"/></g><mask id=\"mask1\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip2\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface8\" clip-path=\"url(#clip2)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 11.085938 1.039062 C 11.867188 1.507812 12.542969 2.09375 13.109375 2.796875 C 13.242188 2.964844 13.367188 3.136719 13.484375 3.316406 C 13.144531 4.226562 12.667969 5.0625 12.050781 5.816406 C 11.761719 6.171875 11.433594 6.496094 11.074219 6.789062 C 10.960938 6.878906 10.839844 6.953125 10.707031 7.011719 C 10.632812 7.046875 10.554688 7.066406 10.472656 7.074219 C 10.292969 7.085938 10.191406 7.007812 10.15625 6.84375 C 10.140625 6.742188 10.148438 6.640625 10.171875 6.542969 C 10.421875 5.710938 10.625 4.867188 10.777344 4.011719 C 10.886719 3.316406 10.972656 2.621094 11.023438 1.921875 C 11.046875 1.625 11.066406 1.332031 11.085938 1.039062 Z M 11.085938 1.039062 \"/></g><mask id=\"mask2\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip3\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface11\" clip-path=\"url(#clip3)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 0 5.910156 C 0 5.90625 0 5.902344 0 5.902344 C 0.285156 4.605469 0.875 3.457031 1.769531 2.453125 C 1.816406 2.40625 1.859375 2.359375 1.90625 2.316406 C 3.164062 2.601562 4.351562 3.0625 5.460938 3.691406 C 5.96875 3.984375 6.441406 4.316406 6.882812 4.695312 C 6.996094 4.800781 7.101562 4.910156 7.195312 5.027344 C 7.257812 5.105469 7.308594 5.191406 7.347656 5.28125 C 7.382812 5.359375 7.394531 5.445312 7.382812 5.53125 C 7.363281 5.609375 7.316406 5.667969 7.242188 5.710938 C 7.167969 5.746094 7.085938 5.769531 7 5.769531 C 6.949219 5.773438 6.898438 5.769531 6.851562 5.765625 C 5.535156 5.621094 4.214844 5.585938 2.894531 5.652344 C 2.304688 5.679688 1.71875 5.726562 1.132812 5.785156 C 0.753906 5.824219 0.375 5.867188 0 5.910156 Z M 0 5.910156 \"/></g><mask id=\"mask3\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip4\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface14\" clip-path=\"url(#clip4)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 14.554688 5.800781 C 14.558594 5.800781 14.5625 5.804688 14.5625 5.808594 C 14.753906 6.859375 14.769531 7.910156 14.613281 8.964844 C 13.882812 9.230469 13.125 9.378906 12.347656 9.414062 C 11.863281 9.433594 11.386719 9.40625 10.910156 9.328125 C 10.726562 9.300781 10.550781 9.257812 10.378906 9.195312 C 10.269531 9.15625 10.171875 9.105469 10.082031 9.039062 C 10.015625 8.988281 9.964844 8.929688 9.929688 8.855469 C 9.886719 8.746094 9.902344 8.648438 9.976562 8.554688 C 10.054688 8.46875 10.152344 8.402344 10.261719 8.359375 C 10.828125 8.125 11.378906 7.863281 11.914062 7.574219 C 12.050781 7.496094 12.183594 7.421875 12.316406 7.339844 C 12.570312 7.1875 12.816406 7.03125 13.066406 6.875 C 13.582031 6.539062 14.078125 6.183594 14.554688 5.800781 Z M 14.554688 5.800781 \"/></g><mask id=\"mask4\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip5\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface17\" clip-path=\"url(#clip5)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 5.527344 6.824219 C 5.644531 6.820312 5.761719 6.828125 5.875 6.851562 C 5.964844 6.867188 6.046875 6.902344 6.117188 6.953125 C 6.21875 7.039062 6.25 7.144531 6.21875 7.269531 C 6.191406 7.347656 6.15625 7.421875 6.105469 7.488281 C 6.085938 7.511719 6.066406 7.535156 6.050781 7.558594 C 5.355469 8.28125 4.710938 9.039062 4.113281 9.832031 C 3.78125 10.289062 3.457031 10.753906 3.148438 11.226562 C 2.792969 11.777344 2.449219 12.339844 2.125 12.910156 C 2.121094 12.914062 2.121094 12.914062 2.117188 12.910156 C 1.15625 11.96875 0.492188 10.859375 0.121094 9.585938 C 0.105469 9.527344 0.0898438 9.46875 0.078125 9.40625 C 1.019531 8.617188 2.070312 7.96875 3.222656 7.46875 C 3.800781 7.222656 4.398438 7.03125 5.015625 6.898438 C 5.1875 6.859375 5.355469 6.835938 5.527344 6.824219 Z M 5.527344 6.824219 \"/></g><mask id=\"mask5\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip6\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface20\" clip-path=\"url(#clip6)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 7.566406 15 C 7.453125 15 7.34375 15 7.234375 15 C 6.660156 14.980469 6.09375 14.90625 5.535156 14.773438 C 5.339844 14.730469 5.140625 14.679688 4.945312 14.625 C 4.941406 14.625 4.933594 14.621094 4.929688 14.617188 C 4.851562 13.40625 4.980469 12.21875 5.316406 11.046875 C 5.445312 10.597656 5.609375 10.164062 5.808594 9.738281 C 5.898438 9.546875 6.007812 9.363281 6.132812 9.195312 C 6.207031 9.101562 6.292969 9.019531 6.394531 8.953125 C 6.625 8.824219 6.792969 8.875 6.902344 9.105469 C 6.9375 9.1875 6.960938 9.269531 6.972656 9.355469 C 7.105469 10.230469 7.289062 11.097656 7.519531 11.957031 C 7.722656 12.648438 7.957031 13.332031 8.226562 14.007812 C 8.34375 14.304688 8.464844 14.597656 8.585938 14.890625 C 8.34375 14.9375 8.101562 14.96875 7.855469 14.984375 C 7.757812 14.988281 7.660156 14.996094 7.566406 15 Z M 7.566406 15 \"/></g><mask id=\"mask6\"><g filter=\"url(#alpha)\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\" style=\"fill:currentColor;fill-opacity:0.996078;stroke:none;\"/></g></mask><clipPath id=\"clip7\"><rect x=\"0\" y=\"0\" width=\"15\" height=\"15\"/></clipPath><g id=\"surface23\" clip-path=\"url(#clip7)\"><path style=\" stroke:none;fill-rule:evenodd;fill:currentColor;fill-opacity:1;\" d=\"M 8.53125 9.535156 C 8.617188 9.539062 8.703125 9.554688 8.78125 9.589844 C 8.8125 9.605469 8.839844 9.621094 8.871094 9.632812 C 9.460938 9.972656 10.070312 10.273438 10.699219 10.542969 C 10.808594 10.585938 10.917969 10.628906 11.023438 10.671875 C 11.261719 10.757812 11.5 10.847656 11.734375 10.933594 C 12.351562 11.148438 12.980469 11.328125 13.617188 11.476562 C 13.621094 11.476562 13.621094 11.480469 13.621094 11.480469 C 13.0625 12.382812 12.335938 13.136719 11.441406 13.742188 C 11.394531 13.773438 11.351562 13.800781 11.308594 13.828125 C 10.761719 13.480469 10.265625 13.074219 9.816406 12.609375 C 9.3125 12.085938 8.890625 11.507812 8.546875 10.878906 C 8.464844 10.726562 8.390625 10.574219 8.328125 10.414062 C 8.277344 10.28125 8.246094 10.144531 8.230469 10.003906 C 8.222656 9.902344 8.234375 9.804688 8.269531 9.707031 C 8.320312 9.601562 8.40625 9.542969 8.53125 9.535156 Z M 8.53125 9.535156 \"/></g></defs><g id=\"surface1\"><use xlink:href=\"#surface5\" mask=\"url(#mask0)\"/><use xlink:href=\"#surface8\" mask=\"url(#mask1)\"/><use xlink:href=\"#surface11\" mask=\"url(#mask2)\"/><use xlink:href=\"#surface14\" mask=\"url(#mask3)\"/><use xlink:href=\"#surface17\" mask=\"url(#mask4)\"/><use xlink:href=\"#surface20\" mask=\"url(#mask5)\"/><use xlink:href=\"#surface23\" mask=\"url(#mask6)\"/></g></svg>",
                        "numeric_order":5000509000,
                        "subs" : [{
                            "id" : 500050900000,
                            "routine_type_id" : 2,
                            "name" :"API PIX SICREDI",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2em\" height=\"2em\" viewBox=\"0 0 16 16\" version=\"1.1\"><g id=\"surface1\"><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 12.128906 11.90625 C 11.546875 11.90625 11.003906 11.683594 10.59375 11.273438 L 8.386719 9.0625 C 8.234375 8.914062 7.960938 8.914062 7.808594 9.0625 L 5.589844 11.28125 C 5.183594 11.691406 4.640625 11.914062 4.058594 11.914062 L 3.625 11.914062 L 6.429688 14.71875 C 7.300781 15.589844 8.726562 15.589844 9.597656 14.71875 L 12.410156 11.90625 Z M 12.128906 11.90625 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 4.050781 4.085938 C 4.628906 4.085938 5.171875 4.308594 5.582031 4.71875 L 7.800781 6.9375 C 7.960938 7.097656 8.21875 7.097656 8.378906 6.9375 L 10.59375 4.726562 C 11.003906 4.316406 11.546875 4.09375 12.128906 4.09375 L 12.394531 4.09375 L 9.582031 1.28125 C 8.707031 0.410156 7.285156 0.410156 6.410156 1.28125 L 3.605469 4.085938 Z M 4.050781 4.085938 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 14.71875 6.417969 L 13.015625 4.71875 C 12.980469 4.738281 12.9375 4.746094 12.890625 4.746094 L 12.117188 4.746094 C 11.71875 4.746094 11.324219 4.90625 11.050781 5.191406 L 8.839844 7.398438 C 8.636719 7.601562 8.359375 7.710938 8.09375 7.710938 C 7.816406 7.710938 7.550781 7.601562 7.34375 7.398438 L 5.128906 5.183594 C 4.84375 4.898438 4.453125 4.738281 4.058594 4.738281 L 3.109375 4.738281 C 3.0625 4.738281 3.027344 4.726562 2.992188 4.710938 L 1.28125 6.417969 C 0.410156 7.292969 0.410156 8.714844 1.28125 9.589844 L 2.984375 11.289062 C 3.019531 11.273438 3.054688 11.261719 3.097656 11.261719 L 4.050781 11.261719 C 4.453125 11.261719 4.84375 11.101562 5.121094 10.816406 L 7.335938 8.601562 C 7.738281 8.199219 8.441406 8.199219 8.839844 8.601562 L 11.046875 10.808594 C 11.332031 11.09375 11.722656 11.253906 12.117188 11.253906 L 12.890625 11.253906 C 12.933594 11.253906 12.972656 11.261719 13.015625 11.28125 L 14.714844 9.582031 C 15.589844 8.707031 15.589844 7.292969 14.71875 6.417969 \"/></g></svg>",
                            "view_path" :"/views/modules/financial/billing/pix/integrations/sicredi/api_pix_sicredi",
                            "numeric_order":500050900000,
                            "subs":[{
                                "id" : 50005090000000,
                                "routine_type_id" : 2,
                                "name" :"CREATE API PIX SICREDI",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2em\" height=\"2em\" viewBox=\"0 0 16 16\" version=\"1.1\"><g id=\"surface1\"><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 12.128906 11.90625 C 11.546875 11.90625 11.003906 11.683594 10.59375 11.273438 L 8.386719 9.0625 C 8.234375 8.914062 7.960938 8.914062 7.808594 9.0625 L 5.589844 11.28125 C 5.183594 11.691406 4.640625 11.914062 4.058594 11.914062 L 3.625 11.914062 L 6.429688 14.71875 C 7.300781 15.589844 8.726562 15.589844 9.597656 14.71875 L 12.410156 11.90625 Z M 12.128906 11.90625 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 4.050781 4.085938 C 4.628906 4.085938 5.171875 4.308594 5.582031 4.71875 L 7.800781 6.9375 C 7.960938 7.097656 8.21875 7.097656 8.378906 6.9375 L 10.59375 4.726562 C 11.003906 4.316406 11.546875 4.09375 12.128906 4.09375 L 12.394531 4.09375 L 9.582031 1.28125 C 8.707031 0.410156 7.285156 0.410156 6.410156 1.28125 L 3.605469 4.085938 Z M 4.050781 4.085938 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 14.71875 6.417969 L 13.015625 4.71875 C 12.980469 4.738281 12.9375 4.746094 12.890625 4.746094 L 12.117188 4.746094 C 11.71875 4.746094 11.324219 4.90625 11.050781 5.191406 L 8.839844 7.398438 C 8.636719 7.601562 8.359375 7.710938 8.09375 7.710938 C 7.816406 7.710938 7.550781 7.601562 7.34375 7.398438 L 5.128906 5.183594 C 4.84375 4.898438 4.453125 4.738281 4.058594 4.738281 L 3.109375 4.738281 C 3.0625 4.738281 3.027344 4.726562 2.992188 4.710938 L 1.28125 6.417969 C 0.410156 7.292969 0.410156 8.714844 1.28125 9.589844 L 2.984375 11.289062 C 3.019531 11.273438 3.054688 11.261719 3.097656 11.261719 L 4.050781 11.261719 C 4.453125 11.261719 4.84375 11.101562 5.121094 10.816406 L 7.335938 8.601562 C 7.738281 8.199219 8.441406 8.199219 8.839844 8.601562 L 11.046875 10.808594 C 11.332031 11.09375 11.722656 11.253906 12.117188 11.253906 L 12.890625 11.253906 C 12.933594 11.253906 12.972656 11.261719 13.015625 11.28125 L 14.714844 9.582031 C 15.589844 8.707031 15.589844 7.292969 14.71875 6.417969 \"/></g></svg>",
                                "view_path" :"/views/modules/financial/billing/pix/integrations/sicredi/api_pix_sicredi/create",
                                "numeric_order":50005090000000,
                                "show_in_menu":0
                            }]
                        },{
                            "id" : 500050900001,
                            "routine_type_id" : 2,
                            "name" :"WEBHOOKS API PIX SICREDI",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"2em\" height=\"2em\" viewBox=\"0 0 16 16\" version=\"1.1\"><g id=\"surface1\"><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 12.128906 11.90625 C 11.546875 11.90625 11.003906 11.683594 10.59375 11.273438 L 8.386719 9.0625 C 8.234375 8.914062 7.960938 8.914062 7.808594 9.0625 L 5.589844 11.28125 C 5.183594 11.691406 4.640625 11.914062 4.058594 11.914062 L 3.625 11.914062 L 6.429688 14.71875 C 7.300781 15.589844 8.726562 15.589844 9.597656 14.71875 L 12.410156 11.90625 Z M 12.128906 11.90625 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 4.050781 4.085938 C 4.628906 4.085938 5.171875 4.308594 5.582031 4.71875 L 7.800781 6.9375 C 7.960938 7.097656 8.21875 7.097656 8.378906 6.9375 L 10.59375 4.726562 C 11.003906 4.316406 11.546875 4.09375 12.128906 4.09375 L 12.394531 4.09375 L 9.582031 1.28125 C 8.707031 0.410156 7.285156 0.410156 6.410156 1.28125 L 3.605469 4.085938 Z M 4.050781 4.085938 \"/><path style=\" stroke:none;fill-rule:nonzero;fill:currentColor;fill-opacity:1;\" d=\"M 14.71875 6.417969 L 13.015625 4.71875 C 12.980469 4.738281 12.9375 4.746094 12.890625 4.746094 L 12.117188 4.746094 C 11.71875 4.746094 11.324219 4.90625 11.050781 5.191406 L 8.839844 7.398438 C 8.636719 7.601562 8.359375 7.710938 8.09375 7.710938 C 7.816406 7.710938 7.550781 7.601562 7.34375 7.398438 L 5.128906 5.183594 C 4.84375 4.898438 4.453125 4.738281 4.058594 4.738281 L 3.109375 4.738281 C 3.0625 4.738281 3.027344 4.726562 2.992188 4.710938 L 1.28125 6.417969 C 0.410156 7.292969 0.410156 8.714844 1.28125 9.589844 L 2.984375 11.289062 C 3.019531 11.273438 3.054688 11.261719 3.097656 11.261719 L 4.050781 11.261719 C 4.453125 11.261719 4.84375 11.101562 5.121094 10.816406 L 7.335938 8.601562 C 7.738281 8.199219 8.441406 8.199219 8.839844 8.601562 L 11.046875 10.808594 C 11.332031 11.09375 11.722656 11.253906 12.117188 11.253906 L 12.890625 11.253906 C 12.933594 11.253906 12.972656 11.261719 13.015625 11.28125 L 14.714844 9.582031 C 15.589844 8.707031 15.589844 7.292969 14.71875 6.417969 \"/></g></svg>",
                            "view_path" :"/views/modules/financial/billing/pix/integrations/sicredi/webhooks_api_pix_sicredi",
                            "numeric_order":500050900001
                        }]
                    }]
                }]
            }]
        }]
    },{      
        "id" : 80,
        "name" : "REPORTS",
        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m296-80-56-56 276-277 140 140 207-207 57 57-264 263-140-140L296-80Zm-136-40q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h560q33 0 56.5 23.5T800-760v168H160v472Zm0-552h560v-88H160v88Zm0 0v-88 88Z\"/></svg>",
        "numeric_order":80,
        "subs":[{      
            "id" :8000,
            "name" : "CAMPAIGNS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z\"/></svg>",
            "numeric_order":8000,
            "subs":[{      
                "id" :800000,
                "routine_type_id" : 1,
                "name" : "CAMPANHA 2025",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M400-320q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm-40-120v-280h80v280h-80Zm-140 0v-200h80v200h-80Zm280 0v-160h80v160h-80ZM824-80 597-307q-41 32-91 49.5T400-240q-134 0-227-93T80-560q0-134 93-227t227-93q134 0 227 93t93 227q0 56-17.5 106T653-363l227 227-56 56Z\"/></svg>",
                "view_path" :"/views/modules/reports/campaigns/sinergy_campaign",
                "numeric_order":800000
            },{      
                "id" :800001,
                "routine_type_id" : 1,
                "name" : "CAMPANHA 2025 PBI",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-120q-33 0-56.5-23.5T80-200v-640l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v640q0 33-23.5 56.5T800-120H160Zm0-80h280v-240H160v240Zm360 0h280v-80H520v80Zm0-160h280v-80H520v80ZM160-520h640v-120H160v120Z\"/></svg>",
                "view_path" :"/views/modules/reports/campaigns/sinergy_campaign_pbi",
                "numeric_order":800001
            },{      
                "id" :800002,
                "routine_type_id" : 1,
                "name" : "CUSTOMIZED CAMPAIGNS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-120v-720h640v400H240v80h200v80H240v80h200v80H160Zm456 0L504-232l56-56 56 56 142-142 56 56-198 198ZM240-520h200v-80H240v80Zm280 0h200v-80H520v80ZM240-680h200v-80H240v80Zm280 0h200v-80H520v80Z\"/></svg>",
                "view_path" :"/views/modules/reports/campaigns/customized_campaigns",
                "numeric_order":800002,
                "subs":[{      
                    "id" :80000200,
                    "routine_type_id" : 1,
                    "name" : "CUSTOMIZED CAMPAIGN",
                    "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-120v-720h640v400H240v80h200v80H240v80h200v80H160Zm456 0L504-232l56-56 56 56 142-142 56 56-198 198ZM240-520h200v-80H240v80Zm280 0h200v-80H520v80ZM240-680h200v-80H240v80Zm280 0h200v-80H520v80Z\"/></svg>",
                    "view_path" :"/views/modules/reports/campaigns/customized_campaigns/:id",
                    "numeric_order":80000200,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" :8000020000,
                        "routine_type_id" : 1,
                        "name" : "CUSTOMIZED CAMPAIGN ENTITY",
                        "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-120v-720h640v400H240v80h200v80H240v80h200v80H160Zm456 0L504-232l56-56 56 56 142-142 56 56-198 198ZM240-520h200v-80H240v80Zm280 0h200v-80H520v80ZM240-680h200v-80H240v80Zm280 0h200v-80H520v80Z\"/></svg>",
                        "view_path" :"/views/modules/reports/campaigns/customized_campaigns/:id/entities/:campaign_entity_id",
                        "numeric_order":8000020000,
                        "show_in_menu":0
                    }]
                }]
            }]
        },{      
            "id" :8001,
            "routine_type_id" : 1,
            "name" : "CUSTOMIZED REPORT",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120ZM200-640h560v-120H200v120Zm100 80H200v360h100v-360Zm360 0v360h100v-360H660Zm-80 0H380v360h200v-360Z\"/></svg>",
            "view_path" :"/views/modules/reports/customizedreport",
            "numeric_order":8002
        },{      
            "id" :8003,
            "routine_type_id" : 1,
            "name" : "CUSTOMIZED POSITIVITY",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M400-640v-200h360q33 0 56.5 23.5T840-760v120H400ZM200-120q-33 0-56.5-23.5T120-200v-360h200v440H200Zm-80-520v-120q0-33 23.5-56.5T200-840h120v200H120ZM520-80 360-240l160-160 56 56-62 64h86q33 0 56.5-23.5T680-360v-88l-64 64-56-56 160-160 160 160-56 56-64-64v88q0 66-47 113t-113 47h-86l62 64-56 56Z\"/></svg>",
            "view_path" :"/views/modules/reports/customizedpositivity",
            "numeric_order":8003
        },{      
            "id" :8005,
            "routine_type_id" : 1,
            "name" : "COMMISSIONS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M260-361v-40H160v-80h200v-80H200q-17 0-28.5-11.5T160-601v-160q0-17 11.5-28.5T200-801h60v-40h80v40h100v80H240v80h160q17 0 28.5 11.5T440-601v160q0 17-11.5 28.5T400-401h-60v40h-80Zm298 240L388-291l56-56 114 114 226-226 56 56-282 282Z\"/></svg>",
            "view_path" :"/views/modules/reports/commissions",
            "numeric_order":8005
        },{      
            "id" :8010,
            "name" : "CLIENTS",
            "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z\"/></svg>",
            "numeric_order":8010,
            "subs":[{      
                "id" :801000,
                "routine_type_id" : 1,
                "name" : "ACTIVES X POSITIVEDS",
                "icon" : "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z\"/></svg>",
                "view_path" :"/views/modules/reports/clients/actives_x_positiveds",
                "numeric_order":801000
            }]
        }]
    },{      
        "id" : 90,
        "name" :"TASKS",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z\"/></svg>",
        "numeric_order":90,
        "subs":[{      
            "id" : 9000,
            "routine_type_id" : 1,
            "name" :"TASKS MANAGEMENT",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z\"/></svg>",
            "view_path" :"/views/modules/tasks/tasks_management",
            "numeric_order":9000,
            "subs":[{      
                "id" : 900000,
                "routine_type_id" : 1,
                "name" :"MY TASKS",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M640-400q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM400-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T640-360q56 0 106.5 13.5T842-306q18 11 28 30t10 40v76H400Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T680-520q0-17-11.5-28.5T640-560q-17 0-28.5 11.5T600-520q0 17 11.5 28.5T640-480Zm0-40Zm0 280ZM120-400v-80h320v80H120Zm0-320v-80h480v80H120Zm324 160H120v-80h360q-14 17-22.5 37T444-560Z\"/></svg>",
                "view_path" :"/views/modules/tasks/tasks_management/user_tasks",
                "numeric_order":900000
            }]
        }]
    },{      
        "id" : 500,
        "name" :"PROJECTS MANAGEMENT",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M120-560v-240h80v94q51-64 124.5-99T480-840q150 0 255 105t105 255h-80q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120Zm2 120h82q12 93 76.5 157.5T435-204l48 84q-138 0-242-91.5T122-440Zm412 70-94-94v-216h80v184l56 56-42 70ZM719 0l-12-60q-12-5-22.5-10.5T663-84l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T707-340l12-60h80l12 60q12 5 23 11.5t21 14.5l58-20 40 70-46 40q2 13 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T811-60L799 0h-80Zm40-120q33 0 56.5-23.5T839-200q0-33-23.5-56.5T759-280q-33 0-56.5 23.5T679-200q0 33 23.5 56.5T759-120Z\"/></svg>",
        "numeric_order":95,
        "subs":[{      
            "id" : 5000,
            "routine_type_id" : 1,
            "name" :"PROJECTS",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
            "view_path" :"/views/modules/projects",
            "numeric_order":5000,
            "subs":[{      
                "id" : 50000,
                "routine_type_id" : 1,
                "name" :"PROJECT",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                "view_path" :"/views/modules/projects/project/:project_id",
                "numeric_order":50000,
                "show_in_menu":0,
                "subs":[{      
                    "id" : 500000,
                    "routine_type_id" : 1,
                    "name" :"PLANNINGS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id",
                    "numeric_order":500000,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000000,
                        "routine_type_id" : 1,
                        "name" :"PLANNING",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id",
                        "numeric_order":5000000,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000000,
                            "routine_type_id" : 1,
                            "name" :"INICIATIVES",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id",
                            "numeric_order":50000000,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500000000,
                                "routine_type_id" : 1,
                                "name" :"INICIATIVE",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id",
                                "numeric_order":500000000,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000000000,
                                    "routine_type_id" : 1,
                                    "name" :"EPICS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id",
                                    "numeric_order":5000000000,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000000000,
                                        "routine_type_id" : 1,
                                        "name" :"EPIC",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id",
                                        "numeric_order":50000000000,
                                        "show_in_menu":0,
                                        "subs":[{
                                            "id" : 500000000000,
                                            "routine_type_id" : 1,
                                            "name" :"FEATURES",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/features/:features_id",
                                            "numeric_order":500000000000,
                                            "show_in_menu":0,
                                            "subs":[
                                                {          
                                                    "id" : 5000000000000,
                                                    "routine_type_id" : 1,
                                                    "name" :"FEATURE",
                                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id",
                                                    "numeric_order":5000000000000,
                                                    "show_in_menu":0,
                                                    "subs":[{
                                                        "id" : 50000000000000,
                                                        "routine_type_id" : 1,
                                                        "name" :"REQUIREMENTS",
                                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                        "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                                        "numeric_order":50000000000000,                                                                              
                                                        "show_in_menu":0
                                                    }]
                                                }
                                            ]
                                        },{
                                            "id" : 500000000001,
                                            "routine_type_id" : 1,
                                            "name" :"REQUIREMENTS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/requirements/:requirements_id",
                                            "numeric_order":500000000001,                                                                              
                                            "show_in_menu":0
                                        }]
                                    }]
                                },{
                                    "id" : 5000000001,
                                    "routine_type_id" : 1,
                                    "name" :"FEATURES",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/features/:features_id",
                                    "numeric_order":5000000001,
                                    "show_in_menu":0,
                                    "subs":[
                                        {          
                                            "id" : 50000000010,
                                            "routine_type_id" : 1,
                                            "name" :"FEATURE",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/features/:features_id/feature/:feature_id",
                                            "numeric_order":50000000010,
                                            "show_in_menu":0,
                                            "subs":[{
                                                "id" : 500000000100,
                                                "routine_type_id" : 1,
                                                "name" :"REQUIREMENTS",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                                "numeric_order":500000000100,                                                                              
                                                "show_in_menu":0
                                            }]
                                        }
                                    ]
                                },{
                                    "id" : 5000000002,
                                    "routine_type_id" : 1,
                                    "name" :"REQUIREMENTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/requirements/:requirements_id",
                                    "numeric_order":5000000002,                                                                              
                                    "show_in_menu":0
                                }]
                            }]
                        },{      
                            "id" : 50000001,
                            "routine_type_id" : 1,
                            "name" :"EPICS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/epics/:epics_id",
                            "numeric_order":50000001,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500000010,
                                "routine_type_id" : 1,
                                "name" :"EPIC",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/epics/:epics_id/epic/:epic_id",
                                "numeric_order":500000010,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000000100,
                                    "routine_type_id" : 1,
                                    "name" :"FEATURES",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/epics/:epics_id/epic/:epic_id/features/:features_id",
                                    "numeric_order":5000000100,
                                    "show_in_menu":0,
                                    "subs":[
                                        {      
                                            "id" :50000001000,
                                            "routine_type_id" : 1,
                                            "name" :"FEATURE",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id",
                                            "numeric_order":50000001000,
                                            "show_in_menu":0,
                                            "subs":[{
                                                "id" : 500000010000,
                                                "routine_type_id" : 1,
                                                "name" :"REQUIREMENTS",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                                "numeric_order":500000010000,
                                                "show_in_menu":0
                                            }]
                                        }
                                    ]
                                },{
                                    "id" : 5000000101,
                                    "routine_type_id" : 1,
                                    "name" :"REQUIREMENTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/epics/:epics_id/epic/:epic_id/requirements/:requirements_id",
                                    "numeric_order":5000000101,
                                    "show_in_menu":0
                                }]
                            }]
                        },{      
                            "id" : 50000002,
                            "routine_type_id" : 1,
                            "name" :"FEATURES",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/features/:features_id",
                            "numeric_order":50000002,
                            "show_in_menu":0,
                            "subs":[
                                {      
                                    "id" : 500000020,
                                    "routine_type_id" : 1,
                                    "name" :"FEATURE",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/features/:features_id/feature/:feature_id",
                                    "numeric_order":500000020,
                                    "show_in_menu":0,
                                    "subs":[
                                        {      
                                            "id" : 5000000200,
                                            "routine_type_id" : 1,
                                            "name" :"REQUIREMENTS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                            "numeric_order":5000000200,
                                            "show_in_menu":0
                                        }
                                    ]
                                }
                            ]
                        },{      
                            "id" : 50000003,
                            "routine_type_id" : 1,
                            "name" :"REQUIREMENTS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/plannings/:plannings_id/planning/:planning_id/requirements/:requirements_id",
                            "numeric_order":50000003,
                            "show_in_menu":0
                        }]
                    }]
                },{      
                    "id" : 500001,
                    "routine_type_id" : 1,
                    "name" :"INICIATIVES",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id",
                    "numeric_order":500001,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000010,
                        "routine_type_id" : 1,
                        "name" :"INICIATIVE",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id",
                        "numeric_order":5000010,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000100,
                            "routine_type_id" : 1,
                            "name" :"EPICS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id",
                            "numeric_order":50000100,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500001000,
                                "routine_type_id" : 1,
                                "name" :"EPIC",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id",
                                "numeric_order":500001000,
                                "show_in_menu":0,
                                "subs":[{                                                         
                                    "id" : 5000010000,
                                    "routine_type_id" : 1,
                                    "name" :"FEATURES",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/features/:features_id",
                                    "numeric_order":5000010000,
                                    "show_in_menu":0,
                                    "subs":[
                                        {          
                                            "id" : 50000100000,
                                            "routine_type_id" : 1,
                                            "name" :"FEATURE",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id",
                                            "numeric_order":50000100000,
                                            "show_in_menu":0,
                                            "subs":[{
                                                "id" : 500001000000,
                                                "routine_type_id" : 1,
                                                "name" :"REQUIREMENTS",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                                "numeric_order":500001000000,
                                                "show_in_menu":0
                                            }]
                                        }
                                    ]
                                },{
                                    "id" : 5000010001,
                                    "routine_type_id" : 1,
                                    "name" :"REQUIREMENTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/epics/:epics_id/epic/:epic_id/requirements/:requirements_id",
                                    "numeric_order":5000010001,
                                    "show_in_menu":0
                                }]
                            }]
                        },{                                                         
                            "id" : 50000101,
                            "routine_type_id" : 1,
                            "name" :"FEATURES",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/features/:features_id",
                            "numeric_order":50000101,
                            "show_in_menu":0,
                            "subs":[
                                {          
                                    "id" : 500001010,
                                    "routine_type_id" : 1,
                                    "name" :"FEATURE",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/features/:features_id/feature/:feature_id",
                                    "numeric_order":500001010,
                                    "show_in_menu":0,
                                    "subs":[{
                                        "id" : 5000010100,
                                        "routine_type_id" : 1,
                                        "name" :"REQUIREMENTS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                        "numeric_order":5000010100,
                                        "show_in_menu":0
                                    }]
                                }
                            ]
                        },{
                            "id" : 50000102,
                            "routine_type_id" : 1,
                            "name" :"REQUIREMENTS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/iniciatives/:iniciatives_id/iniciative/:iniciative_id/requirements/:requirements_id",
                            "numeric_order":50000102,
                            "show_in_menu":0
                        }]
                    }]
                },{      
                    "id" : 500002,
                    "routine_type_id" : 1,
                    "name" :"EPICS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/epics/:epics_id",
                    "numeric_order":500002,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000020,
                        "routine_type_id" : 1,
                        "name" :"EPIC",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/epics/:epics_id/epic/:epic_id",
                        "numeric_order":5000020,
                        "show_in_menu":0,
                        "subs":[{                                                         
                            "id" : 50000200,
                            "routine_type_id" : 1,
                            "name" :"FEATURES",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/epics/:epics_id/epic/:epic_id/features/:features_id",
                            "numeric_order":50000200,
                            "show_in_menu":0,
                            "subs":[
                                {          
                                    "id" : 500002000,
                                    "routine_type_id" : 1,
                                    "name" :"FEATURE",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id",
                                    "numeric_order":500002000,
                                    "show_in_menu":0,
                                    "subs":[{
                                        "id" : 5000020000,
                                        "routine_type_id" : 1,
                                        "name" :"REQUIREMENTS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/epics/:epics_id/epic/:epic_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                        "numeric_order":5000020000,
                                        "show_in_menu":0
                                    }]
                                }
                            ]
                        },{
                            "id" : 50000201,
                            "routine_type_id" : 1,
                            "name" :"REQUIREMENTS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/epics/:epics_id/epic/:epic_id/requirements/:requirements_id",
                            "numeric_order":50000201,
                            "show_in_menu":0
                        }]
                    }]
                },{                                                         
                    "id" : 500003,
                    "routine_type_id" : 1,
                    "name" :"FEATURES",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/features/:features_id",
                    "numeric_order":500003,
                    "show_in_menu":0,
                    "subs":[
                        {          
                            "id" : 5000030,
                            "routine_type_id" : 1,
                            "name" :"FEATURE",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/features/:features_id/feature/:feature_id",
                            "numeric_order":5000030,
                            "show_in_menu":0,
                            "subs":[
                                {          
                                    "id" : 50000300,
                                    "routine_type_id" : 1,
                                    "name" :"REQUIREMENTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/features/:features_id/feature/:feature_id/requirements/:requirements_id",
                                    "numeric_order":50000300,
                                    "show_in_menu":0
                                }
                            ]
                        }
                    ]
                },{          
                    "id" : 500004,
                    "routine_type_id" : 1,
                    "name" :"REQUIREMENTS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/requirements/:requirements_id",
                    "numeric_order":500004,
                    "show_in_menu":0
                },{      
                    "id" : 500005,
                    "routine_type_id" : 1,
                    "name" :"MANAGEMENTS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id",
                    "numeric_order":500005,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000050,
                        "routine_type_id" : 1,
                        "name" :"MANAGEMENT",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id",
                        "numeric_order":5000050,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000500,
                            "routine_type_id" : 1,
                            "name" :"AGILE METHODOLOGIES",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id",
                            "numeric_order":50000500,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500005000,
                                "routine_type_id" : 1,
                                "name" :"AGILE METHODOLOGY",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id",
                                "numeric_order":500005000,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000050000,
                                    "routine_type_id" : 1,
                                    "name" :"SCRUMS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id",
                                    "numeric_order":5000050000,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000500000,
                                        "routine_type_id" : 1,
                                        "name" :"SCRUM",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id",
                                        "numeric_order":50000500000,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005000000,
                                            "routine_type_id" : 1,
                                            "name" :"BACKLOGS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id",
                                            "numeric_order":500005000000,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050000000,
                                                "routine_type_id" : 1,
                                                "name" :"BACKLOG",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                                "numeric_order":5000050000000,
                                                "show_in_menu":0,
                                                "subs":[{      
                                                    "id" : 50000500000000,
                                                    "routine_type_id" : 1,
                                                    "name" :"TASKS",
                                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                                    "numeric_order":50000500000000,
                                                    "show_in_menu":0,
                                                    "subs":[{      
                                                        "id" : 500005000000000,
                                                        "routine_type_id" : 1,
                                                        "name" :"TASK",
                                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                                        "numeric_order":500005000000000,
                                                        "show_in_menu":0,
                                                        "subs":[]
                                                    }]
                                                }]
                                            }]
                                        },{      
                                            "id" : 500005000001,
                                            "routine_type_id" : 1,
                                            "name" :"BACKLOG",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id",
                                            "numeric_order":500005000001,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050000010,
                                                "routine_type_id" : 1,
                                                "name" :"TASKS",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                                "numeric_order":5000050000010,
                                                "show_in_menu":0,
                                                "subs":[{      
                                                    "id" : 50000500000100,
                                                    "routine_type_id" : 1,
                                                    "name" :"TASK",
                                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                                    "numeric_order":50000500000100,
                                                    "show_in_menu":0,
                                                    "subs":[]
                                                }]
                                            }]
                                        },{      
                                            "id" : 500005000002,
                                            "routine_type_id" : 1,
                                            "name" :"SPRINTS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id",
                                            "numeric_order":500005000002,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050000020,
                                                "routine_type_id" : 1,
                                                "name" :"SPRINT",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                                "numeric_order":5000050000020,
                                                "show_in_menu":0,
                                                "subs":[{      
                                                    "id" : 50000500000200,
                                                    "routine_type_id" : 1,
                                                    "name" :"TASKS",
                                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                                    "numeric_order":50000500000200,
                                                    "show_in_menu":0,
                                                    "subs":[{      
                                                        "id" : 500005000002000,
                                                        "routine_type_id" : 1,
                                                        "name" :"TASK",
                                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                                        "numeric_order":500005000002000,
                                                        "show_in_menu":0,
                                                        "subs":[]
                                                    }]
                                                }]
                                            }]
                                        }]
                                    }]
                                },{      
                                    "id" : 5000050001,
                                    "routine_type_id" : 1,
                                    "name" :"SCRUM",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id",
                                    "numeric_order":5000050001,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000500010,
                                        "routine_type_id" : 1,
                                        "name" :"BACKLOGS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id",
                                        "numeric_order":50000500010,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005000100,
                                            "routine_type_id" : 1,
                                            "name" :"BACKLOG",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                            "numeric_order":500005000100,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050001000,
                                                "routine_type_id" : 1,
                                                "name" :"TASKS",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                                "numeric_order":5000050001000,
                                                "show_in_menu":0,
                                                "subs":[{      
                                                    "id" : 50000500010000,
                                                    "routine_type_id" : 1,
                                                    "name" :"TASK",
                                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                                    "numeric_order":50000500010000,
                                                    "show_in_menu":0,
                                                    "subs":[]
                                                }]
                                            }]
                                        }]
                                    },{      
                                        "id" : 50000500011,
                                        "routine_type_id" : 1,
                                        "name" :"BACKLOG",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlog/:backlog_id",
                                        "numeric_order":50000500011,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005000110,
                                            "routine_type_id" : 1,
                                            "name" :"TASKS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                            "numeric_order":500005000110,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050001100,
                                                "routine_type_id" : 1,
                                                "name" :"TASK",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                                "numeric_order":5000050001100,
                                                "show_in_menu":0,
                                                "subs":[]
                                            }]
                                        }]
                                    },{      
                                        "id" : 50000500012,
                                        "routine_type_id" : 1,
                                        "name" :"SPRINTS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id",
                                        "numeric_order":50000500012,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005000120,
                                            "routine_type_id" : 1,
                                            "name" :"SPRINT",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                            "numeric_order":500005000120,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050001200,
                                                "routine_type_id" : 1,
                                                "name" :"TASKS",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                                "numeric_order":5000050001200,
                                                "show_in_menu":0,
                                                "subs":[{      
                                                    "id" : 50000500012000,
                                                    "routine_type_id" : 1,
                                                    "name" :"TASK",
                                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                                    "numeric_order":50000500012000,
                                                    "show_in_menu":0,
                                                    "subs":[]
                                                }]
                                            }]
                                        }]
                                    }]
                                },{      
                                    "id" : 5000050002,
                                    "routine_type_id" : 1,
                                    "name" :"SPRINTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id",
                                    "numeric_order":5000050002,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000500020,
                                        "routine_type_id" : 1,
                                        "name" :"SPRINT",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                        "numeric_order":50000500020,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005000200,
                                            "routine_type_id" : 1,
                                            "name" :"TASKS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                            "numeric_order":500005000200,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050002000,
                                                "routine_type_id" : 1,
                                                "name" :"TASK",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                                "numeric_order":5000050002000,
                                                "show_in_menu":0,
                                                "subs":[]
                                            }]
                                        }]
                                    }]
                                }]
                            }]
                        },{      
                            "id" : 50000501,
                            "routine_type_id" : 1,
                            "name" :"SCRUMS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id",
                            "numeric_order":50000501,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500005010,
                                "routine_type_id" : 1,
                                "name" :"SCRUM",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id",
                                "numeric_order":500005010,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000050100,
                                    "routine_type_id" : 1,
                                    "name" :"BACKLOGS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id",
                                    "numeric_order":5000050100,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000501000,
                                        "routine_type_id" : 1,
                                        "name" :"BACKLOG",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                        "numeric_order":50000501000,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005010000,
                                            "routine_type_id" : 1,
                                            "name" :"TASKS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                            "numeric_order":500005010000,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050100000,
                                                "routine_type_id" : 1,
                                                "name" :"TASK",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                                "numeric_order":5000050100000,
                                                "show_in_menu":0,
                                                "subs":[]
                                            }]
                                        }]
                                    }]
                                },{      
                                    "id" : 5000050101,
                                    "routine_type_id" : 1,
                                    "name" :"BACKLOG",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id",
                                    "numeric_order":5000050101,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000501010,
                                        "routine_type_id" : 1,
                                        "name" :"TASKS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                        "numeric_order":50000501010,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005010100,
                                            "routine_type_id" : 1,
                                            "name" :"TASK",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                            "numeric_order":500005010100,
                                            "show_in_menu":0,
                                            "subs":[]
                                        }]
                                    }]
                                },{      
                                    "id" : 5000050102,
                                    "routine_type_id" : 1,
                                    "name" :"SPRINTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id",
                                    "numeric_order":5000050102,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000501020,
                                        "routine_type_id" : 1,
                                        "name" :"SPRINT",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                        "numeric_order":50000501020,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005010200,
                                            "routine_type_id" : 1,
                                            "name" :"TASKS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                            "numeric_order":500005010200,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000050102000,
                                                "routine_type_id" : 1,
                                                "name" :"TASK",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                                "numeric_order":5000050102000,
                                                "show_in_menu":0,
                                                "subs":[]
                                            }]
                                        }]
                                    }]
                                }]
                            }]
                        },{      
                            "id" : 50000502,
                            "routine_type_id" : 1,
                            "name" :"SCRUM",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id",
                            "numeric_order":50000502,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500005020,
                                "routine_type_id" : 1,
                                "name" :"BACKLOGS",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlogs/:backlogs_id",
                                "numeric_order":500005020,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000050200,
                                    "routine_type_id" : 1,
                                    "name" :"BACKLOG",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                    "numeric_order":5000050200,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000502000,
                                        "routine_type_id" : 1,
                                        "name" :"TASKS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                        "numeric_order":50000502000,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005020000,
                                            "routine_type_id" : 1,
                                            "name" :"TASK",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                            "numeric_order":500005020000,
                                            "show_in_menu":0,
                                            "subs":[]
                                        }]
                                    }]
                                }]
                            },{      
                                "id" : 500005021,
                                "routine_type_id" : 1,
                                "name" :"BACKLOG",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlog/:backlog_id",
                                "numeric_order":500005021,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000050210,
                                    "routine_type_id" : 1,
                                    "name" :"TASKS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                    "numeric_order":5000050210,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000502100,
                                        "routine_type_id" : 1,
                                        "name" :"TASK",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                        "numeric_order":50000502100,
                                        "show_in_menu":0,
                                        "subs":[]
                                    }]
                                }]
                            },{      
                                "id" : 500005022,
                                "routine_type_id" : 1,
                                "name" :"SPRINTS",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/sprints/:sprints_id",
                                "numeric_order":500005022,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000050220,
                                    "routine_type_id" : 1,
                                    "name" :"SPRINT",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                    "numeric_order":5000050220,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000502200,
                                        "routine_type_id" : 1,
                                        "name" :"TASKS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                        "numeric_order":50000502200,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500005022000,
                                            "routine_type_id" : 1,
                                            "name" :"TASK",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                            "numeric_order":500005022000,
                                            "show_in_menu":0,
                                            "subs":[]
                                        }]
                                    }]
                                }]
                            }]
                        },{      
                            "id" : 50000503,
                            "routine_type_id" : 1,
                            "name" :"TASKS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/tasks/:tasks_id",
                            "numeric_order":50000503,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500005030,
                                "routine_type_id" : 1,
                                "name" :"TASK",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/managements/:managements_id/management/:management_id/tasks/:tasks_id/task/:task_id",
                                "numeric_order":500005030,
                                "show_in_menu":0,
                                "subs":[]
                            }]
                        }]
                    }]
                },{      
                    "id" : 500006,
                    "routine_type_id" : 1,
                    "name" :"AGILE METHODOLOGIES",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id",
                    "numeric_order":500006,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000060,
                        "routine_type_id" : 1,
                        "name" :"AGILE METHODOLOGY",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id",
                        "numeric_order":5000060,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000600,
                            "routine_type_id" : 1,
                            "name" :"SCRUMS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id",
                            "numeric_order":50000600,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500006000,
                                "routine_type_id" : 1,
                                "name" :"SCRUM",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id",
                                "numeric_order":500006000,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000060000,
                                    "routine_type_id" : 1,
                                    "name" :"BACKLOGS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id",
                                    "numeric_order":5000060000,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000600000,
                                        "routine_type_id" : 1,
                                        "name" :"BACKLOG",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                        "numeric_order":50000600000,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500006000000,
                                            "routine_type_id" : 1,
                                            "name" :"TASKS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                            "numeric_order":500006000000,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000060000000,
                                                "routine_type_id" : 1,
                                                "name" :"TASK",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                                "numeric_order":5000060000000,
                                                "show_in_menu":0,
                                                "subs":[]
                                            }]
                                        }]
                                    }]
                                },{      
                                    "id" : 5000060001,
                                    "routine_type_id" : 1,
                                    "name" :"BACKLOG",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id",
                                    "numeric_order":5000060001,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000600010,
                                        "routine_type_id" : 1,
                                        "name" :"TASKS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                        "numeric_order":50000600010,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500006000100,
                                            "routine_type_id" : 1,
                                            "name" :"TASK",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                            "numeric_order":500006000100,
                                            "show_in_menu":0,
                                            "subs":[]
                                        }]
                                    }]
                                },{      
                                    "id" : 5000060002,
                                    "routine_type_id" : 1,
                                    "name" :"SPRINTS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id",
                                    "numeric_order":5000060002,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000600020,
                                        "routine_type_id" : 1,
                                        "name" :"SPRINT",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                        "numeric_order":50000600020,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500006000200,
                                            "routine_type_id" : 1,
                                            "name" :"TASKS",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                            "numeric_order":500006000200,
                                            "show_in_menu":0,
                                            "subs":[{      
                                                "id" : 5000060002000,
                                                "routine_type_id" : 1,
                                                "name" :"TASK",
                                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                                "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                                "numeric_order":5000060002000,
                                                "show_in_menu":0,
                                                "subs":[]
                                            }]
                                        }]
                                    }]
                                }]
                            }]
                        },{      
                            "id" : 50000601,
                            "routine_type_id" : 1,
                            "name" :"SCRUM",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id",
                            "numeric_order":50000601,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500006010,
                                "routine_type_id" : 1,
                                "name" :"BACKLOGS",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id",
                                "numeric_order":500006010,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000060100,
                                    "routine_type_id" : 1,
                                    "name" :"BACKLOG",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                    "numeric_order":5000060100,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000601000,
                                        "routine_type_id" : 1,
                                        "name" :"TASKS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                        "numeric_order":50000601000,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500006010000,
                                            "routine_type_id" : 1,
                                            "name" :"TASK",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                            "numeric_order":500006010000,
                                            "show_in_menu":0,
                                            "subs":[]
                                        }]
                                    }]
                                }]
                            },{      
                                "id" : 500006011,
                                "routine_type_id" : 1,
                                "name" :"BACKLOG",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlog/:backlog_id",
                                "numeric_order":500006011,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000060110,
                                    "routine_type_id" : 1,
                                    "name" :"TASKS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                    "numeric_order":5000060110,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000601100,
                                        "routine_type_id" : 1,
                                        "name" :"TASK",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                        "numeric_order":50000601100,
                                        "show_in_menu":0,
                                        "subs":[]
                                    }]
                                }]
                            },{      
                                "id" : 500006012,
                                "routine_type_id" : 1,
                                "name" :"SPRINTS",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id",
                                "numeric_order":500006012,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000060120,
                                    "routine_type_id" : 1,
                                    "name" :"SPRINT",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                    "numeric_order":5000060120,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000601200,
                                        "routine_type_id" : 1,
                                        "name" :"TASKS",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                        "numeric_order":50000601200,
                                        "show_in_menu":0,
                                        "subs":[{      
                                            "id" : 500006012000,
                                            "routine_type_id" : 1,
                                            "name" :"TASK",
                                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                            "view_path" :"/views/modules/projects/project/:project_id/agile_methodologies/:agile_methodologies_id/agile_methodology/:agile_methodology_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                            "numeric_order":500006012000,
                                            "show_in_menu":0,
                                            "subs":[]
                                        }]
                                    }]
                                }]
                            }]
                        }]
                    }]
                },{      
                    "id" : 500007,
                    "routine_type_id" : 1,
                    "name" :"SCRUMS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id",
                    "numeric_order":500007,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000070,
                        "routine_type_id" : 1,
                        "name" :"SCRUM",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id",
                        "numeric_order":5000070,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000700,
                            "routine_type_id" : 1,
                            "name" :"BACKLOGS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id",
                            "numeric_order":50000700,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500007000,
                                "routine_type_id" : 1,
                                "name" :"BACKLOG",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id",
                                "numeric_order":500007000,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000070000,
                                    "routine_type_id" : 1,
                                    "name" :"TASKS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                                    "numeric_order":5000070000,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000700000,
                                        "routine_type_id" : 1,
                                        "name" :"TASK",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                        "numeric_order":50000700000,
                                        "show_in_menu":0,
                                        "subs":[]
                                    }]
                                }]
                            }]
                        },{      
                            "id" : 50000701,
                            "routine_type_id" : 1,
                            "name" :"BACKLOG",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id",
                            "numeric_order":50000701,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500007010,
                                "routine_type_id" : 1,
                                "name" :"TASKS",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id",
                                "numeric_order":500007010,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000070100,
                                    "routine_type_id" : 1,
                                    "name" :"TASK",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                    "numeric_order":5000070100,
                                    "show_in_menu":0,
                                    "subs":[]
                                }]
                            }]
                        },{      
                            "id" : 50000702,
                            "routine_type_id" : 1,
                            "name" :"SPRINTS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id",
                            "numeric_order":50000702,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500007020,
                                "routine_type_id" : 1,
                                "name" :"SPRINT",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id",
                                "numeric_order":500007020,
                                "show_in_menu":0,
                                "subs":[{      
                                    "id" : 5000070200,
                                    "routine_type_id" : 1,
                                    "name" :"TASKS",
                                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                    "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                                    "numeric_order":5000070200,
                                    "show_in_menu":0,
                                    "subs":[{      
                                        "id" : 50000702000,
                                        "routine_type_id" : 1,
                                        "name" :"TASK",
                                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                        "view_path" :"/views/modules/projects/project/:project_id/scrums/:scrums_id/scrum/:scrum_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                        "numeric_order":50000702000,
                                        "show_in_menu":0,
                                        "subs":[]
                                    }]
                                }]
                            }]
                        }]
                    }]
                },{      
                    "id" : 500008,
                    "routine_type_id" : 1,
                    "name" :"BACKLOGS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/backlogs/:backlogs_id",
                    "numeric_order":500008,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000080,
                        "routine_type_id" : 1,
                        "name" :"BACKLOG",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/backlogs/:backlogs_id/backlog/:backlog_id",
                        "numeric_order":5000080,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000800,
                            "routine_type_id" : 1,
                            "name" :"TASKS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id",
                            "numeric_order":50000800,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500008000,
                                "routine_type_id" : 1,
                                "name" :"TASK",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/backlogs/:backlogs_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                                "numeric_order":500008000,
                                "show_in_menu":0,
                                "subs":[]
                            }]
                        }]
                    }]
                },{      
                    "id" : 500009,
                    "routine_type_id" : 1,
                    "name" :"BACKLOG",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/backlog/:backlog_id",
                    "numeric_order":500009,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000090,
                        "routine_type_id" : 1,
                        "name" :"TASKS",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/backlog/:backlog_id/tasks/:tasks_id",
                        "numeric_order":5000090,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50000900,
                            "routine_type_id" : 1,
                            "name" :"TASK",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/backlog/:backlog_id/tasks/:tasks_id/task/:task_id",
                            "numeric_order":50000900,
                            "show_in_menu":0,
                            "subs":[]
                        }]
                    }]
                },{      
                    "id" : 500010,
                    "routine_type_id" : 1,
                    "name" :"SPRINTS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/sprints/:sprints_id",
                    "numeric_order":500010,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000100,
                        "routine_type_id" : 1,
                        "name" :"SPRINT",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/sprints/:sprints_id/sprint/:sprint_id",
                        "numeric_order":5000100,
                        "show_in_menu":0,
                        "subs":[{      
                            "id" : 50001000,
                            "routine_type_id" : 1,
                            "name" :"TASKS",
                            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                            "view_path" :"/views/modules/projects/project/:project_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id",
                            "numeric_order":50001000,
                            "show_in_menu":0,
                            "subs":[{      
                                "id" : 500010000,
                                "routine_type_id" : 1,
                                "name" :"TASK",
                                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                                "view_path" :"/views/modules/projects/project/:project_id/sprints/:sprints_id/sprint/:sprint_id/tasks/:tasks_id/task/:task_id",
                                "numeric_order":500010000,
                                "show_in_menu":0,
                                "subs":[]
                            }]
                        }]
                    }]
                },{      
                    "id" : 500011,
                    "routine_type_id" : 1,
                    "name" :"TASKS",
                    "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                    "view_path" :"/views/modules/projects/project/:project_id/tasks/:tasks_id",
                    "numeric_order":500011,
                    "show_in_menu":0,
                    "subs":[{      
                        "id" : 5000110,
                        "routine_type_id" : 1,
                        "name" :"TASK",
                        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M600-160v-80H440v-200h-80v80H80v-240h280v80h80v-200h160v-80h280v240H600v-80h-80v320h80v-80h280v240H600Zm80-80h120v-80H680v80ZM160-440h120v-80H160v80Zm520-200h120v-80H680v80Zm0 400v-80 80ZM280-440v-80 80Zm400-200v-80 80Z\"/></svg>",
                        "view_path" :"/views/modules/projects/project/:project_id/tasks/:tasks_id/task/:task_id",
                        "numeric_order":5000110,
                        "show_in_menu":0,
                        "subs":[]
                    }]
                }]
            }]
        }]
    },{      
        "id" : 900,
        "name" :"APIS",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z\"/></svg>",
        "numeric_order":900,
        "subs":[{      
            "id" : 90000,
            "routine_type_id" : 1,
            "name" :"MAPS API",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M640-560v-126 126ZM174-132q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v337q-15-23-35.5-42T760-528v-204l-120 46v126q-21 0-41 3.5T560-546v-140l-160-56v523l-226 87Zm26-96 120-46v-468l-120 40v474Zm440-12q34 0 56.5-20t23.5-60q1-34-22.5-57T640-400q-34 0-57 23t-23 57q0 34 23 57t57 23Zm0 80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 43.5T778-238l102 102-56 56-102-102q-18 11-38.5 16.5T640-160ZM320-742v468-468Z\"/></svg>",
            "view_path" :"/views/modules/apis/maps",
            "numeric_order":90000,
            "subs":[{      
                "id" : 9000000,
                "routine_type_id" : 1,
                "name" :"MAPS API RESPONSES",
                "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M640-560v-126 126ZM174-132q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v337q-15-23-35.5-42T760-528v-204l-120 46v126q-21 0-41 3.5T560-546v-140l-160-56v523l-226 87Zm26-96 120-46v-468l-120 40v474Zm440-12q34 0 56.5-20t23.5-60q1-34-22.5-57T640-400q-34 0-57 23t-23 57q0 34 23 57t57 23Zm0 80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 43.5T778-238l102 102-56 56-102-102q-18 11-38.5 16.5T640-160ZM320-742v468-468Z\"/></svg>",
                "view_path" :"/views/modules/apis/maps/responses/:id",
                "numeric_order":9000000,
                "show_in_menu":0
            }]
        }]
    },{      
        "id" : 999,
        "name" :"PROCESSMENTS",
        "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"M480-480ZM370-80l-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-74 56q-22-11-45-18.5T714-558l63-48-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q17 17 36.5 30.5T400-275q1 57 23.5 107T484-80H370Zm41-279q6-20 14.5-38.5T445-433q-11-8-17-20.5t-6-26.5q0-25 17.5-42.5T482-540q14 0 27 6.5t21 17.5q17-11 35-19.5t38-13.5q-18-32-50-51.5T482-620q-59 0-99.5 41T342-480q0 38 18.5 70.5T411-359Zm269 199 120-120-120-120-28 28 72 72H560v40h163l-71 72 28 28Zm0 80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Z\"/></svg>",
        "numeric_order":999,
        "subs":[{      
            "id" : 99900,
            "routine_type_id" : 1,
            "name" :"PROCESSMENTS",
            "icon" :"<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"2em\" viewBox=\"0 -960 960 960\" width=\"2em\" fill=\"currentColor\"><path d=\"m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z\"/></svg>",
            "view_path" :"/views/modules/processments",
            "numeric_order":99900        
        }]     
    }
];