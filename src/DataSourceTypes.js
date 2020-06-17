const DataSourceTypes = {
    'Armory': {
        'armor': {
            'table': [
                'name',
                'armor_type',
                'level',
                'price',
                'eac_bonus',
                'kac_bonus',
                'max_dex_bonus',
                'ac_penalty',
                'speed_penalty',
                'upgrade_slots',
                'bulk'
            ],
            'modal': [
                'armor_type',
                'level',
                'price',
                'eac_bonus',
                'kac_bonus',
                'max_dex_bonus',
                'ac_penalty',
                'speed_penalty',
                'upgrade_slots',
                'bulk',
                'description'
            ]
        },
        'weapons': {
            'table': [
                'name',
                'damage',
                {'weapon_category': ['name', '_hands'
            ]},
            ],
            'modal': [
                'name',
                'damage',
                {'weapon_category': ['name', '_hands'
            ]},
            ]
        },
    },
    'Market': {
        'items': {
            'table': [
                'name',
                'type',
                'level',
                'price',
                'bulk',
                'capacity',
                'usage',
                'hands'
            ],
            'modal': ['name']
        },
        'goods_and_services': {
            'table': [
                'name',
                'type',
                'price',
                'bulk'
            ],
            'modal': [
                'name',
                'type',
                'price',
                'bulk'
            ],
        },
        'poisons': {
            'table': [
                'name',
                'level',
                'price',
                'type',
                'fort_save',
                'track',
                'onset',
                'frequency',
                'cure'
            ],
            'modal': []
        },
        'medicinals': {
            'table': [
                'name',
                'level',
                'price'
            ],
            'modal': []
        },
        'drugs': {
            'table': [
                'name',
                'level',
                'price',
                'type',
                'fort_save',
                'addiction',
                'track',
                'effect'
            ],
            'modal': []
        },
                   
    },
    'Character': {
        'spells': {
            'table': [
                'name',
                'mystic_level',
                'technomancer_level',
                'witchwarper_level',
                {'effect_range': ['name']},
            ],
            'modal': []
        },
        'skills': {
            'table': [
                'name',
                {'ability': ['name']},
                'untrained',
                'ac_penalty',
                'envoy',
                'mechanic',
                'mystic',
                'operative',
                'solarian',
                'soldier',
                'technomancer',
                'biohacker',
                'vanguard',
                'witchwarper'
            ],
            'modal': []
        },
        'classes': {
            'table': ['name',
                'hit_points',
                'stamina_points',
                'key_ability_score',
                'skills_per_level'
            ],
            'modal': [
                'hit_points',
                'stamina_points',
                'key_ability_score',
                'skills_per_level',
                { 
                    'class_proficiencies': ['name'],
                },
                'long_description'
            ],
            'modalTabs': [
                'class_features',
            ]
        },
        'feats': {
            'table': ['name',
                'prerequisities',
                'description',
                'combat'
            ],
            'modal': ['prerequisities',
                'long_description',
                'combat'
            ]
        },
                   
    }
}
export default DataSourceTypes
